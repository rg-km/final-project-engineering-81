package repository

import (
	"strconv"

	"github.com/rg-km/final-project-engineering-81/backend/db"
)

type BookRepository struct {
	db db.DB
}

func NewBookRepository(db db.DB) BookRepository {
	return BookRepository{db}
}

func (u *BookRepository) LoadOrCreate() ([]Book, error) {
	records, err := u.db.Load("books")
	if err != nil {
		records = [][]string{
			{"penulis", "judul", "harga"},
		}
		if err := u.db.Save("book", records); err != nil {
			return nil, err
		}
	}

	result := make([]Book, 0)
	for i := 1; i < len(records); i++ {
		harga, err := strconv.Atoi(records[i][2])
		if err != nil {
			return nil, err
		}

		user := Book{
			Penulis: records[i][0],
			Judul:   records[i][1],
			Harga:   harga,
		}
		result = append(result, user)
	}

	return result, nil

}

func (u *BookRepository) SelectAll() ([]Book, error) {
	bookItems, err := u.LoadOrCreate()
	if err != nil {
		return nil, err
	}
	return bookItems, nil
}
