package main

import (
	"flag"
	"fmt"
	"github.com/jspaste/frontend/www"
	"github.com/valyala/fasthttp"
	"io"
	"log"
	"log/slog"
	"net"
	"os"
	"strings"
	"time"
)

func main() {
	slog.SetLogLoggerLevel(slog.LevelInfo)
	flag.Parse()

	bindAddress := getEnv("JSPF_BIND_ADDRESS", "[::]").(string)
	port := getEnv("JSPF_PORT", uint16(3000)).(uint16)

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
			ctx.SetContentType("text/html; charset=utf-8")
		}
		requestHandler(ctx)

		if ctx.Response.StatusCode() == fasthttp.StatusNotFound {
			ctx.Request.SetRequestURI("/index.html")
			ctx.SetContentType("text/html; charset=utf-8")
			requestHandler(ctx)
		}

		path = string(ctx.Request.URI().Path())
		if strings.HasPrefix(path, "/assets/") {
			ctx.Response.Header.Set(fasthttp.HeaderCacheControl, "max-age=31536000, public, immutable")
		} else if strings.HasSuffix(path, ".html") {
			ctx.Response.Header.Set(fasthttp.HeaderCacheControl, "max-age=0, public, must-revalidate")
		} else {
			ctx.Response.Header.Set(fasthttp.HeaderCacheControl, "max-age=600, public")
		}

		ctx.Response.Header.Del(fasthttp.HeaderLastModified)
	}

	server := &fasthttp.Server{
		GetOnly:               true,
		Handler:               handler,
		Logger:                log.New(io.Discard, "", 0),
		NoDefaultServerHeader: true,
		ReadTimeout:           60 * time.Second,
		WriteTimeout:          60 * time.Second,
	}

	listen, err := net.Listen("tcp", fmt.Sprintf("%s:%d", bindAddress, port))
	if err != nil {
		slog.Error("Can't listen address;", "error", err)
		os.Exit(1)
	}

	slog.Info("Server running;", "listening", listen.Addr())

	if err = server.Serve(listen); err != nil {
		slog.Error("Unexpected server status;", "error", err)
		os.Exit(1)
	}
}
