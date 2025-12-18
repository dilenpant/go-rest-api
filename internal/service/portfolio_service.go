package service

import "go-rest-api/internal/repository"

type PortfolioService struct {
	Repo *repository.PortfolioRepository
}

func (s *PortfolioService) GetPortfolio() (interface{}, error) {
	return s.Repo.Get()
}
