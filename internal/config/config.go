package config

import "os"

type Config struct {
	Port     string
	DataFile string
}

func Load() *Config {
	return &Config{
		Port:     os.Getenv("APP_PORT"),
		DataFile: os.Getenv("DATA_FILE"),
	}
}
