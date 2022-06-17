package main

import (
	"database/sql"
	"web_bukukita/backend/api"
	"web_bukukita/backend/repository"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "backend/db/bukukita.db")
	if err != nil {
		panic(err)
	}

	usersRepo := repository.NewUserRepository(db)

	mainAPI := api.NewAPI(*usersRepo)
	mainAPI.Start()
}
