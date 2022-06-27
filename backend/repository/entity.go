package repository

type User struct {
	ID       int64  `db:"id"`
	Name     string `db:"name"`
	Email    string `db:"email"`
	Password string `db:"password"`
	Role     string `db:"role"`
	Loggedin bool   `db:"loggedin"`
	Token    string
}

type Book struct {
	ID            int64  `db:"id"`
	Judul         string `db:"judul"`
	Penulis       string `db:"penulis"`
	Penerbit      string `db:"penerbit"`
	TahunTerbit   string `db:"tahunTerbit"`
	JumlahHalaman string `db:"jumlahHalaman"`
	ISBN          string `db:"isbn"`
	Kategori      string `db:"kategori"`
	Bahasa        string `db:"bahasa"`
	Berat         int    `db:"berat"`
	Harga         int    `db:"harga"`
	Kondisi       string `db:"kondisi"`
	Deskripsi     string `db:"deskripsi"`
	Stok          int    `db:"stok"`
}
