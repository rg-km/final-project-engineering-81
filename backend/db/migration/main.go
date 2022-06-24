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

	CREATE TABLE IF NOT EXISTS product (
		id integer NOT NULL primary key AUTOINCREMENT,
		title string NOT NULL,
		writer_name string NOT NULL,
		price integer NOT NULL,
		stock integer NOT NULL,
		sold integer NOT NULL,
		description longtext NOT NULL,
		condition string NOT NULL,
		weight string NOT NULL,
		number_of_pages NOT NULL,
		isbn string NOT NULL,
		publication_year int NOT NULL,
		publisher string NOT NULL,
		language string NOT NULL,
		category_name string NOT NULL,
		donation_date datetime NOT NULL,
		created_at datetime NOT NULL,
		updated_at datetime NOT NULL,
	);
	
	`)

	if err != nil {
		panic(err)
	}
}
