GOPATH ?= $(HOME)/go

.DEFAULT_GOAL = build

PHONY: bindata.go
bindata.go:
	$(GOPATH)/bin/go-bindata data www/...

tech-talk build: bindata.go
	go build

install: tech-talk
	go install

clean:
	@$(RM) -v bindata.go tech-talk

run:
	./tech-talk -n
