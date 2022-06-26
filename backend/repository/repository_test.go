package repository_test

import (
	"database/sql"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/rg-km/final-project-engineering-81/backend/repository"
)

var _ = Describe("Repository Test", func() {
	var db *sql.DB
	var err error
	var usersRepo *repository.UserRepository
	var booksRepo *repository.BookRepository

	BeforeEach(func() {
		//Setup
		db, err = sql.Open("sqlite3", "./bukukita2.db")
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

	INSERT INTO books(judul, penulis,  penerbit, tahun_terbit, jumlah_halaman, isbn, kategori, bahasa, berat, harga, kondisi, deskripsi, stok) VALUES
    ('Bahasa Indonesia 1', 'Joko Budiman' ,'Gramedia', '2005', '100', '978-200-8767', 'Buku Pelajaran', 'Indonesia', 100, 200, 'Baru', 'Buku Pelajaran Sekolah Dasar', 5),
	('Bahasa Inggris 2', 'Bagus Salim', 'Gramedia', '2015', '100', '978-200-9467', 'Buku Pelajaran', 'English', 100, 300, 'Baru', 'Buku Pelajaran Sekolah Pertama', 5),
	('Bahasa Indonesia 3', 'Hendar Kusuma', 'Erlangga', '2012', '100', '978-200-3767', 'Buku Pelajaran', 'Indonesia', 100, 400, 'Baru', 'Buku Pelajaran Sekolah Menengah', 5);

		`)

		if err != nil {
			panic(err)
		}

		usersRepo = repository.NewUserRepository(db)
		booksRepo = repository.NewBookRepostitory(db)

	})

	AfterEach(func() {
		// Teardown
		db, err := sql.Open("sqlite3", "/bukukita.db")
		if err != nil {
			panic(err)
		}

		_, err = db.Exec(`
		DROP TABLE IF EXISTS users;
		DROP TABLE IF EXISTX books;

		`)

		if err != nil {
			panic(err)
		}
	})

	Describe("Select All Users", func() {
		When("get all user list from database", func() {
			It("should return all user list", func() {
				userList, err := usersRepo.FetchUsers()
				Expect(err).ToNot(HaveOccurred())

				Expect(userList[0].Name).To(Equal("novela"))
				Expect(userList[0].Email).To(Equal("novela@gmail.com"))
				Expect(userList[0].Role).To(Equal("admin"))
				Expect(userList[0].Loggedin).To(Equal(false))

			})
		})
	})

	Describe("Login", func() {
		When("email and password are correct", func() {
			It("accepts the login", func() {
				res, err := usersRepo.Login("novela@gmail.com", "novela123")
				Expect(err).ToNot(HaveOccurred())
				Expect(*res).To(Equal("novela@gmail.com"))
				Expect(*userRole).To(Equal("admin"))
				Expect(tokenString).To(Equal("token"))
			})
		})
		When("email is correct but password is incorrect", func() {
			It("rejects the login", func() {
				_, err := usersRepo.Login("novela@gmial.com", "novela123")
				Expect(err).To(HaveOccurred())
				Expect(err.Error()).To(Equal("email atau password anda tidak valid"))
			})
		})
		When("both username and password is incorrect", func() {
			It("rejects the login", func() {
				_, err := usersRepo.Login("dhimas", "12345")
				Expect(err).To(HaveOccurred())
				Expect(err.Error()).To(Equal("email atau password anda tidak valid"))
			})
		})
	})

	Describe("Select All Book", func() {
		When("get all book list from database in books table", func() {
			It("return book information in the same order as database", func() {
				bookList, err := booksRepo.FetchBooks()
				Expect(err).ToNot(HaveOccurred())
				Expect(bookList[0].Judul).To(Equal("Bahasa Indonesia 1"))
				Expect(bookList[0].Penulis).To(Equal("Joko Budiman"))
				Expect(bookList[0].Penerbit).To(Equal("Gramedia"))
				Expect(bookList[0].TahunTerbit).To(Equal("2005"))
				Expect(bookList[0].JumlahHalaman).To(Equal("100"))
				Expect(bookList[0].ISBN).To(Equal("978-200-8767"))
				Expect(bookList[0].Kategori).To(Equal("Buku Pelajaran"))
				Expect(bookList[0].Bahasa).To(Equal("Indonesia"))
				Expect(bookList[0].Berat).To(Equal(100))
				Expect(bookList[0].Harga).To(Equal(200))
				Expect(bookList[0].Kondisi).To(Equal("Baru"))
				Expect(bookList[0].Deskripsi).To(Equal("Buku Pelajaran Sekolah Dasar"))
				Expect(bookList[0].Stok).To(Equal(5))
			})
		})
	})
})
