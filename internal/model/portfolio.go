package model

type Portfolio struct {
	Name     string   `json:"name"`
	Headline string   `json:"headline"`
	Location string   `json:"location"`
	Summary  string   `json:"summary"`
	Skills   []string `json:"skills"`
	Email    string   `json:"email"`
	LinkedIn string   `json:"linkedin"`
}
