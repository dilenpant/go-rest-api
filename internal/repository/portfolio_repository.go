package repository

import (
	"encoding/json"
	"os"

	"go-rest-api/internal/model"
)

type PortfolioRepository struct {
	FilePath string
}

func (r *PortfolioRepository) Get() (*model.Portfolio, error) {
	data, err := os.ReadFile(r.FilePath)
	if err != nil {
		return nil, err
	}

	var p model.Portfolio
	err = json.Unmarshal(data, &p)
	return &p, err
}
