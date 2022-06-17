package repository

import (
	"database/sql"
	"errors"
	"log"
	"regexp"

	"golang.org/x/crypto/bcrypt"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (u *UserRepository) FetchUserByID(id int64) (*User, error) {
	var user User
	sqlStatement := `SELECT * FROM users WHERE id = ?`

	row := u.db.QueryRow(sqlStatement, id)
	err := row.Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Password,
		&user.Role,
		&user.Loggedin,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (u *UserRepository) FetchUsers() ([]User, error) {
	var sqlStatement string
	var users []User

	sqlStatement = `SELECT * FROM users`

	rows, err := u.db.Query(sqlStatement)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var user User

		err := rows.Scan(
			&user.ID,
			&user.Name,
			&user.Email,
			&user.Password,
			&user.Role,
			&user.Loggedin,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func (u *UserRepository) ChangeStatus(status bool, email string) error {
	sqlStmt := `UPDATE users SET loggedin = ? WHERE email = ?`

	_, err := u.db.Exec(sqlStmt, status, email)

	if err != nil {
		return err
	}

	return nil
}

func compareHashPassword(hashpass, pass string) bool {
	byteHash := []byte(hashpass)
	err := bcrypt.CompareHashAndPassword(byteHash, []byte(pass))
	if err != nil {
		log.Println(err)
		return false
	}

	return true
}

func (u *UserRepository) Login(email string, password string) (*string, error) {

	users, err := u.FetchUsers()

	if err != nil {
		return nil, err
	}

	for _, user := range users {
		if user.Email == email {
			if compareHashPassword(user.Password, password) {
				err := u.ChangeStatus(true, user.Email)
				if err != nil {
					return nil, err
				}
				return &user.Email, nil
			} else {
				return nil, errors.New("email atau password anda tidak valid")
			}
		}
	}
	return nil, errors.New("email atau password anda tidak valid")
}

func hashPassword(password []byte) string {

	hash, err := bcrypt.GenerateFromPassword(password, bcrypt.MinCost)
	if err != nil {
		panic("Failed to hash password")
	}
	return string(hash)
}

func (u *UserRepository) IsDuplicateEmail(email string) bool {
	users, _ := u.FetchUsers()

	for _, user := range users {
		if user.Email == email {
			return true
		}
	}

	return false
}

func (u *UserRepository) IsDuplicatePass(password string) bool {
	users, _ := u.FetchUsers()

	for _, user := range users {
		if compareHashPassword(user.Password, password) {
			return true
		}
	}

	return false
}

func isEmailValid(e string) bool {
	emailRegex := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	return emailRegex.MatchString(e)
}

func (u *UserRepository) InsertUser(name string, email string, password string, role string) (*string, error) {
	hashPassword := hashPassword([]byte(password))

	if isEmailValid(email) {
		sqlStatement := `INSERT INTO users (name, email, password, role,loggedin) 
		VALUES (?, ?, ?, ?, false)`

		_, err := u.db.Exec(sqlStatement, name, role, email, hashPassword)
		if err != nil {
			return nil, err
		}
	} else {
		return nil, errors.New("format email anda salah (example@gmail.com)")
	}

	return &email, nil
}

func (u *UserRepository) FindLoggedInUser() ([]string, error) {
	sqlStmt := `SELECT email FROM users WHERE loggedin = true`

	row, err := u.db.Query(sqlStmt)

	if err != nil {
		return nil, errors.New("tidak ada user yang login")
	}

	defer row.Close()

	var emails []string
	for row.Next() {
		var email string

		err := row.Scan(&email)

		if err != nil {
			return nil, err
		}

		emails = append(emails, email)
	}

	return emails, nil
}

func (u *UserRepository) FetchUserRole(email string) (*string, error) {
	sqlStatement := `SELECT role FROM users WHERE email = ?`

	row := u.db.QueryRow(sqlStatement, email)
	var role string

	err := row.Scan(
		&role,
	)

	if err != nil {
		return nil, err
	}

	return &role, nil
}
