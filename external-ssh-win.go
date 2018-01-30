// +build windows

package main

const canUseExternal = false

func externalSSH(so interface{}) {
	// Not available on Windows.
}
