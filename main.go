package main

import (
	"github.com/jspaste/frontend/frontend"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

func main() {
	app := NewApp()

	err := wails.Run(&options.App{
		Title:            "JSPaste",
		Width:            1024,
		Height:           768,
		MinWidth:         256,
		MinHeight:        512,
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 1},
		AssetServer: &assetserver.Options{
			Assets: frontend.Embed(),
		},
		LogLevel:                         logger.DEBUG,
		LogLevelProduction:               logger.INFO,
		OnStartup:                        app.startup,
		EnableFraudulentWebsiteDetection: false,
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop:     false,
			DisableWebViewDrop: false,
		},
	})

	if err != nil {
		panic(err)
	}
}
