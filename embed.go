package main

import (
	"embed"
	"io/fs"
)

//go:embed all:dist/frontend
var bundle embed.FS

func StaticEmbed() fs.FS {
	build, err := fs.Sub(bundle, "dist/frontend")
	if err != nil {
		panic(err)
	}

	return build
}
