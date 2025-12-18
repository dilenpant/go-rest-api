package main

import (
	"go-rest-api/internal/config"
	"go-rest-api/internal/handler"
	"go-rest-api/internal/repository"
	"go-rest-api/internal/service"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	cfg := config.Load()

	repo := &repository.PortfolioRepository{FilePath: cfg.DataFile}
	svc := &service.PortfolioService{Repo: repo}
	h := &handler.PortfolioHandler{Service: svc}

	r := gin.Default()
	r.LoadHTMLGlob("templates/*")
	r.Static("/static", "./static")

	r.GET("/", h.Home)

	log.Fatal(r.Run(":" + cfg.Port))
}
