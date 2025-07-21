package frontend

import (
	"embed"
	"io/fs"
)

//go:embed all:dist
var bundle embed.FS

func Embed() fs.FS {
	build, err := fs.Sub(bundle, "dist")
	if err != nil {
		panic(err)
	}

	return build
}
