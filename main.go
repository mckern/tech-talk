package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"os/user"
	"path"
	"path/filepath"
	"runtime"
	"text/template"
	"time"

	"github.com/araddon/dateparse"
	flag "github.com/spf13/pflag"

	assetfs "github.com/elazarl/go-bindata-assetfs"
	socketio "github.com/googollee/go-socket.io"
)

type templateValues struct {
	Prefix   string
	Markdown string
}

const (
	defaultHost     = "localhost"
	techTalkVersion = "1.3.1"
	iso8601         = "2006-01-02T15:04:05-0700"
)

var (
	indexTemplate *template.Template
	socketServer  *socketio.Server
	mdFilename    string
	currentUser   *user.User

	screen    *bool
	sshType   *string
	sshHost   *string
	key       *string
	pass      *string
	port      *int
	noBrowser *bool
	version   *bool
	buildDate string
)

// Checks if a file exists and can be accessed.
func checkAccess(filename string) bool {
	_, err := os.Stat(filename)
	return err == nil
}

// Copy data from a reader (e.g. PTY or Stdin pipe) to the web socket.
func copyToSocket(r io.Reader, so socketio.Socket) {
	for {
		data := make([]byte, 512)
		n, err := r.Read(data)
		if err != nil {
			log.Println(err)
			break
		}
		if n > 0 {
			so.Emit("output", string(data))
		}
	}
}

// Return an HTML page with the slideshow
func indexHandler(w http.ResponseWriter, r *http.Request) {
	// If we aren't getting the index itself, serve static files in the
	// same directory as the input Markdown slides file.
	if r.URL.Path != "/" {
		http.FileServer(http.Dir(filepath.Dir(mdFilename))).ServeHTTP(w, r)
		return
	}

	var data templateValues

	// Read the file on each request so that updates get applied when working
	// on the slideshow.
	var b []byte

	if mdFilename != "" {
		b, _ = ioutil.ReadFile(mdFilename)
		data.Markdown = string(b)
	} else {
		b, _ = Asset("data/example.md")
		data.Markdown = string(b)
	}

	b, _ = Asset("data/prefix.md")
	data.Prefix = string(b)

	w.Header().Add("Content-Type", "text/html")
	indexTemplate.Execute(w, data)
}

// Create a new socket server to handle communication with a PTY shell.
// This allows you to run stuff in a terminal without ever leaving the
// slideshow.
func createSocketServer() {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	socketServer = server

	socketServer.On("connection", func(so socketio.Socket) {
		log.Printf("Terminal connected from %s\n", so.Request().RemoteAddr)
		if *screen == true {
			log.Println("Using local screen session 'demo'")
			externalScreen(so)
		} else {
			if *sshType == "internal" || canUseExternal == false {
				log.Println("Using internal SSH client")
				internalSSH(so)
			} else {
				externalSSH(so)
			}
		}
	})

	socketServer.On("error", func(so socketio.Socket, err error) {
		log.Println("Error:", err)
	})
}

func init() {
	u, err := user.Current()
	if err != nil {
		log.Fatal("Couldn't get current user!")
	}
	currentUser = u

	prettyDate, _ := dateparse.ParseAny(buildDate)

	flag.Usage = func() {
		fmt.Fprintf(os.Stderr, "Usage: tech-talk [slides.md]\n")
		flag.PrintDefaults()
		os.Exit(2)
	}

	// Connection options
	screen = flag.BoolP("screen", "S", false, "Use local 'demo' screen session")
	sshHost = flag.StringP("host", "H", defaultHost, "SSH connection [user@]`hostname`[:port]")
	sshType = flag.StringP("ssh", "s", "auto", "SSH `method` [auto, internal]")

	// Auth options
	keyDefault := ""

	idRsaPath := path.Join(currentUser.HomeDir, ".ssh", "id_rsa")
	if checkAccess(idRsaPath) {
		keyDefault = idRsaPath
	}

	key = flag.StringP("key", "k", keyDefault, "SSH private key `path` (for internal SSH)")
	pass = flag.StringP("pass", "p", "", "SSH `password` (for internal SSH)")
	port = flag.IntP("port", "P", 4000, "TCP port to listen on")

	// Misc options
	noBrowser = flag.BoolP("no-browser", "n", false, "Do not automatically open browser")
	version = flag.BoolP("version", "v", false, "Print program version and exit")

	flag.Parse()
	args := flag.Args()

	if *version {
		fmt.Printf("tech-talk\t%s\n", techTalkVersion)
		fmt.Print("Build information:\n")
		fmt.Printf("    go version: %s\n", runtime.Version())
		fmt.Printf("    build date: %s\n", prettyDate.Format(iso8601))
		os.Exit(0)
	}

	if len(args) > 0 {
		if !checkAccess(args[0]) {
			log.Fatalf("Cannot access %s", args[0])
		}

		mdFilename = args[0]
	}
}

func main() {
	// Start web sockets
	createSocketServer()
	http.Handle("/wetty/socket.io/", socketServer)

	// Setup web server
	indexBytes, _ := Asset("data/index.template")
	indexTemplate = template.Must(template.New("index").Parse(string(indexBytes)))

	http.HandleFunc("/", indexHandler)

	http.Handle("/static/",
		http.StripPrefix("/static/",
			http.FileServer(
				&assetfs.AssetFS{Asset: Asset, AssetDir: AssetDir, AssetInfo: AssetInfo, Prefix: "www"})))

	s := &http.Server{
		Addr:           fmt.Sprintf(":%d", *port),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Printf("Server started on http://127.0.0.1:%d/", *port)

	if !*noBrowser && checkAccess("/usr/bin/open") {
		c := exec.Command("/usr/bin/open", fmt.Sprintf("http://127.0.0.1:%d/", *port))
		c.Start()
	}

	log.Panic(s.ListenAndServe())
}
