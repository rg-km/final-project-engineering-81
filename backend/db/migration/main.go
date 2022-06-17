package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open("sqlite3", "backend/db/bukukita.db")
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS users (
	id integer NOT NULL primary key AUTOINCREMENT,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	role varchar(255) NOT NULL,
	loggedin boolean NOT NULL
	);
	
	`)

	if err != nil {
		panic(err)
	}
}
