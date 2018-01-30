// +build !windows

package main

import (
	"os"
	"syscall"
	"unsafe"
)

const canUseExternal = true

// Resize a PTY using system calls. This functionality / utility is missing
// from the kr/pty project so it is added here.
func resizePty(t *os.File, row, col int) error {
	ws := struct {
		wsRow    uint16
		wsCol    uint16
		wsXpixel uint16
		wsYpixel uint16
	}{
		uint16(row),
		uint16(col),
		0,
		0,
	}

	_, _, errno := syscall.Syscall(
		syscall.SYS_IOCTL,
		t.Fd(),
		syscall.TIOCSWINSZ,
		uintptr(unsafe.Pointer(&ws)),
	)
	if errno != 0 {
		return syscall.Errno(errno)
	}
	return nil
}
