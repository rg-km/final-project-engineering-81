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

	CREATE TABLE IF NOT EXISTS books (
		id integer NOT NULL primary key AUTOINCREMENT,
		judul varchar(255) NOT NULL,
		penerbit varchar(255) NOT NULL,
		tahun_terbit varchar(255) NOT NULL,
		jumlah_halaman varchar(255) NOT NULL,
		isbn varchar(255) NOT NULL,
		kategori varchar(255) NOT NULL,
		bahasa varchar(255) NOT NULL,
		berat integer NOT NULL,
		harga integer NOT NULL,
		kondisi varchar(255) NOT NULL,
		deskripsi varchar(255) NOT NULL,
		stok integer NOT NULL
	);
	
	`)

	if err != nil {
		panic(err)
	}
}
