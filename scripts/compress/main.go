package main

import (
	"compress/gzip"
	"io"
	"log"
	"os"
	"path/filepath"
	"regexp"

	"github.com/andybalholm/brotli"
	"github.com/klauspost/compress/zstd"
)

var compressors = []struct {
	extension string
	writer    func(io.Writer) (io.WriteCloser, error)
}{
	{
		".br",
		func(writer io.Writer) (io.WriteCloser, error) {
			return brotli.NewWriterLevel(writer, brotli.BestCompression), nil
		},
	},
	{
		".zst",
		func(writer io.Writer) (io.WriteCloser, error) {
			return zstd.NewWriter(writer, zstd.WithEncoderLevel(zstd.SpeedBestCompression))
		},
	},
	{
		".gz",
		func(writer io.Writer) (io.WriteCloser, error) {
			return gzip.NewWriterLevel(writer, gzip.BestCompression)
		},
	},
}

func main() {
	err := filepath.Walk("./dist/frontend/", func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && regexp.MustCompile(`\.(css|html|js|json|svg|xml)$`).MatchString(info.Name()) {
			for _, compressor := range compressors {
				if err = compress(path, compressor.extension, compressor.writer); err != nil {
					return err
				}
			}

			log.Print("Compressed: ", path)
		}

		return nil
	})
	if err != nil {
		log.Fatal(err)
	}
}

func compress(path, extension string, compressor func(io.Writer) (io.WriteCloser, error)) error {
	inFile, err := os.Open(path)
	if err != nil {
		return err
	}
	defer inFile.Close() //nolint:errcheck

	outFile, err := os.Create(path + extension)
	if err != nil {
		return err
	}
	defer outFile.Close() //nolint:errcheck

	writer, err := compressor(outFile)
	if err != nil {
		return err
	}
	defer writer.Close() //nolint:errcheck

	_, err = io.Copy(writer, inFile)
	return err
}
