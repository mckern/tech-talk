GOPATH ?= $(HOME)/go

.DEFAULT_GOAL = build

PHONY: bindata.go
bindata.go:
	$(GOPATH)/bin/go-bindata data www/...

build: bindata.go
	go build

clean:
	@$(RM) -v bindata.go tech-talk

run:
	./tech-talk -n
