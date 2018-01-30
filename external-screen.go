// +build !windows

package main

import (
	"log"
	"os/exec"

	"github.com/googollee/go-socket.io"
	"github.com/kr/pty"
)

// Connect to an external SSH client (or other external login shell)
func externalScreen(so socketio.Socket) {
	var c *exec.Cmd

	screenName := "demo"

	log.Printf("Attaching to screen session %s\n", screenName)
	c = exec.Command("/usr/bin/screen", "-xRR", screenName)

	log.Printf("Command: /usr/bin/screen -xRR %v\n", screenName)
	f, err := pty.Start(c)
	if err != nil {
		panic(err)
	}

	so.On("input", func(msg string) {
		f.Write([]byte(msg))
	})

	so.On("resize", func(msg map[string]int) {
		rows, cols, err := pty.Getsize(f)

		if err != nil {
			log.Printf("Error: could not get PTY size. %s\n", err)
			return
		}

		if rows != msg["row"] || cols != msg["col"] {
			log.Printf("Resize: %d cols x %d row\n", msg["col"], msg["row"])
			resizePty(f, msg["row"], msg["col"])
		}
	})

	so.On("disconnection", func() {
		log.Println("Terminal disconnect")
		c.Process.Kill()
	})

	go copyToSocket(f, so)
}
