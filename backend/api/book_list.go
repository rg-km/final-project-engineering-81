package api

import (
	"encoding/json"
	"net/http"
)

type BookListErrorResponse struct {
	Error string `json:"error"`
}

type Book struct {
	Judul         string `json:"judul"`
	Penulis       string `json:"penulis"`
	Penerbit      string `json:"penerbit"`
	TahunTerbit   string `json:"tahunTerbit"`
	JumlahHalaman string `json:"jumlahHalaman"`
	ISBN          string `json:"isbn"`
	Kategori      string `json:"kategori"`
	Bahasa        string `json:"bahasa"`
	Berat         int    `json:"berat"`
	Harga         int    `json:"harga"`
	Kondisi       string `json:"kondisi"`
	Deskripsi     string `json:"deskripsi"`
	Stok          int    `json:"stok"`
}

type BookListSuccessResponse struct {
	Books []Book `json:"books"`
}

func (api *API) bookList(w http.ResponseWriter, req *http.Request) {
	api.AllowOrigin(w, req)
	encoder := json.NewEncoder(w)

	response := BookListSuccessResponse{}
	response.Books = make([]Book, 0)

	books, err := api.booksRepo.FetchBooks()
	defer func() {
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			encoder.Encode(DashboardErrorResponse{Error: err.Error()})
			return
		}
	}()
	if err != nil {
		return
	}

	for _, book := range books {
		response.Books = append(response.Books, Book{
			Judul:         book.Judul,
			Penulis:       book.Penulis,
			Penerbit:      book.Penerbit,
			TahunTerbit:   book.TahunTerbit,
			JumlahHalaman: book.JumlahHalaman,
			ISBN:          book.ISBN,
			Kategori:      book.Kategori,
			Bahasa:        book.Bahasa,
			Berat:         book.Berat,
			Harga:         book.Harga,
			Kondisi:       book.Kondisi,
			Deskripsi:     book.Deskripsi,
			Stok:          book.Stok,
		})
	}

	encoder.Encode(response)
}
