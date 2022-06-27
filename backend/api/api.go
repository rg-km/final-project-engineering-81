package api

import (
	"fmt"
	"net/http"

	"github.com/rg-km/final-project-engineering-81/backend/repository"
)

type API struct {
	usersRepo repository.UserRepository
	booksRepo repository.BookRepository
	mux       *http.ServeMux
}

func NewAPI(usersRepo repository.UserRepository, booksRepo repository.BookRepository) API {
	mux := http.NewServeMux()
	api := API{
		usersRepo, booksRepo, mux,
	}

	mux.Handle("/api/user/login", api.POST(http.HandlerFunc(api.login)))
	mux.Handle("/api/user/logout", api.POST(http.HandlerFunc(api.logout)))
	mux.Handle("/api/user/register", api.POST(http.HandlerFunc(api.register)))

	// API with AuthMiddleware:
	mux.Handle("/api/books", api.GET(api.AuthMiddleWare(http.HandlerFunc(api.bookList))))
	// mux.Handle("/api/create/books", api.POST(api.AuthMiddleWare(http.HandlerFunc(api.bookCreate))))
	mux.Handle("/api/books/delete", api.POST(api.AuthMiddleWare(http.HandlerFunc(api.bookDelete))))

	// // API with AuthMiddleware and AdminMiddleware
	mux.Handle("/api/admin/users", api.GET(api.AuthMiddleWare(api.AdminMiddleware(http.HandlerFunc(api.userList)))))

	return api
}

func (api *API) Handler() *http.ServeMux {
	return api.mux
}

func (api *API) Start() {
	fmt.Println("starting web server at http://localhost:8080/")
	http.ListenAndServe(":8080", api.Handler())
}
