package handler

import (
	"net/http"

	"go-rest-api/internal/service"

	"github.com/gin-gonic/gin"
)

type PortfolioHandler struct {
	Service *service.PortfolioService
}

func (h *PortfolioHandler) Home(c *gin.Context) {
	data, err := h.Service.GetPortfolio()
	if err != nil {
		c.String(http.StatusInternalServerError, err.Error())
		return
	}
	c.HTML(http.StatusOK, "index.html", data)
}
