package main

import (
	"database/sql"

	"github.com/rg-km/final-project-engineering-81/backend/api"
	"github.com/rg-km/final-project-engineering-81/backend/repository"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "backend/db/bukukita.db")
	if err != nil {
		panic(err)
	}

	usersRepo := repository.NewUserRepository(db)
	booksRepo := repository.NewBookRepository(db)

	mainAPI := api.NewAPI(*usersRepo, *booksRepo)
	mainAPI.Start()
}
