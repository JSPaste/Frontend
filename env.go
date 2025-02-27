package main

import (
	"github.com/joho/godotenv"
	"log/slog"
	"os"
	"strconv"
)

func loadEnvFile() {
	if !checkedEnvFile {
		if err := godotenv.Load(".env.local", ".env"); err != nil {
			slog.Debug(".env file not loaded;", "reason", err)
		}

		checkedEnvFile = true
	}
}

func getEnv(key string, defaultValue interface{}) interface{} {
	loadEnvFile()

	if value, exists := os.LookupEnv(key); exists {
		switch expectedType := defaultValue.(type) {
		case int8, int16, int32, int64, int:
			if parseInt, err := strconv.ParseInt(value, 10, 64); err == nil {
				switch expectedType.(type) {
				case int8:
					return int8(parseInt)
				case int16:
					return int16(parseInt)
				case int32:
					return int32(parseInt)
				case int64:
					return parseInt
				case int:
					return int(parseInt)
				}
			}
		case uint8, uint16, uint32, uint64, uint:
			if parseUint, err := strconv.ParseUint(value, 10, 64); err == nil {
				switch expectedType.(type) {
				case uint8:
					return uint8(parseUint)
				case uint16:
					return uint16(parseUint)
				case uint32:
					return uint32(parseUint)
				case uint64:
					return parseUint
				case uint:
					return uint(parseUint)
				}
			}
		case float32, float64:
			if parseFloat, err := strconv.ParseFloat(value, 64); err == nil {
				switch expectedType.(type) {
				case float32:
					return float32(parseFloat)
				case float64:
					return parseFloat
				}
			}
		case bool:
			if parseBool, err := strconv.ParseBool(value); err == nil {
				return parseBool
			}
		case string:
			return value
		}

		slog.Info("Unexpected value for env key, falling back to default;", "key", key, "value", value, "defaultValue", defaultValue)
	}

	return defaultValue
}

// one time check for .env file
var checkedEnvFile = false
