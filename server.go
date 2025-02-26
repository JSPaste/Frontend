package main

import (
	"fmt"
	"github.com/jspaste/frontend/www"
	"github.com/valyala/fasthttp"
	"io"
	"log"
	"log/slog"
	"os"
	"strings"
	"time"
)

func main() {
	bindAddressEnv := getEnv("JSPF_BIND_ADDRESS", "localhost").(string)
	portEnv := getEnv("JSPF_PORT", uint16(3000)).(uint16)

	fs := &fasthttp.FS{
		FS: www.Bundle(),
		CompressedFileSuffixes: map[string]string{
			"gzip": ".gz",
			"br":   ".br",
			"zstd": ".zst",
		},
		Compress:       true,
		CompressBrotli: true,
		CompressZstd:   true,
	}

	requestHandler := fs.NewRequestHandler()

	handler := func(ctx *fasthttp.RequestCtx) {
		path := string(ctx.Request.URI().Path())

		if !strings.Contains(path, ".") {
			ctx.Request.SetRequestURI("/index.html")
			ctx.Response.Header.Set("Content-Type", "text/html; charset=utf-8")
		}

		requestHandler(ctx)

		if ctx.Response.StatusCode() == fasthttp.StatusNotFound {
			ctx.Request.SetRequestURI("/index.html")
			ctx.Response.Header.Set("Content-Type", "text/html; charset=utf-8")
			requestHandler(ctx)
		}

		path = string(ctx.Request.URI().Path())

		if strings.HasPrefix(path, "/assets/") {
			ctx.Response.Header.Set("Cache-Control", "max-age=31536000, public, immutable, no-transform")
		} else if strings.HasSuffix(path, ".html") {
			ctx.Response.Header.Set("Cache-Control", "max-age=0, public, must-revalidate")
		} else {
			ctx.Response.Header.Set("Cache-Control", "max-age=600, public, no-transform")
		}

		ctx.Response.Header.Del("Last-Modified")
	}

	server := &fasthttp.Server{
		GetOnly:               true,
		Handler:               handler,
		Logger:                log.New(io.Discard, "", 0),
		NoDefaultServerHeader: true,
		ReadTimeout:           60 * time.Second,
		WriteTimeout:          60 * time.Second,
	}

	slog.Info("Server running;", "bindAddress", bindAddressEnv, "port", portEnv)

	if err := server.ListenAndServe(fmt.Sprintf("%s:%d", bindAddressEnv, portEnv)); err != nil {
		slog.Error("Unexpected server status;", "error", err)
		os.Exit(1)
	}
}
