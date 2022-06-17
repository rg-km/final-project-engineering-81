package api

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type Register struct {
	Name     string `json:"name"`
	Email    string `json: "email"`
	Password string `json: "password"`
	Role     string `json:"role"`
}

type LoginSuccessResponse struct {
	Email string `json:"email"`
	Token string `json:"token"`
}

type RegisterSuccessResponse struct {
	Email string `json:"email"`
	Token string `json:"token"`
}

type AuthErrorResponse struct {
	Error string `json:"error"`
}

type Claims struct {
	Email string
	Role  string
	jwt.StandardClaims
}

func getSecretKey() string {
	secretKey := os.Getenv("JWT_SECRET")
	if secretKey != "" {
		secretKey = "bukukita"
	}
	return secretKey
}

func (api *API) login(w http.ResponseWriter, req *http.Request) {
	api.AllowOrigin(w, req)
	var user Login
	err := json.NewDecoder(req.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	res, err := api.usersRepo.Login(user.Email, user.Password)

	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		encoder.Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	userRole, _ := api.usersRepo.FetchUserRole(*res)

	//Deklarasi expiry time untuk token jwt
	expirationTime := time.Now().Add(60 * time.Minute)

	//Buat claim menggunakan variable yang sudah didefinisikan diatas
	claims := &Claims{
		Email: *res,
		Role:  *userRole,
		StandardClaims: jwt.StandardClaims{
			//expiry time menggunakan time millisecond
			ExpiresAt: expirationTime.Unix(),
		},
	}

	secretKey := getSecretKey()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	//Buat jwt string dari token yang sudah dibuat menggunakan JWT key yang telah dideklarasikan
	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		//return internal error ketika ada kesalahan ketika pembuatan JWT string
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//Set token string ke dalam cookie response
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
		Path:    "/",
	})

	json.NewEncoder(w).Encode(LoginSuccessResponse{Email: *res, Token: tokenString})
}

func (api *API) logout(w http.ResponseWriter, req *http.Request) {
	api.AllowOrigin(w, req)
	encoder := json.NewEncoder(w)
	token, err := req.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			//return unauthorized ketika token kosong
			w.WriteHeader(http.StatusUnauthorized)
			encoder.Encode(AuthErrorResponse{Error: err.Error()})
			return
		}
		//return bad request ketika field token tidak ada
		w.WriteHeader(http.StatusBadRequest)
		encoder.Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	if token.Value == "" {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	tknStr := token.Value

	claims := &Claims{}

	secretKey := getSecretKey()
	//parse JWT token ke dalam claim
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			//return unauthorized ketika signature invalid
			w.WriteHeader(http.StatusUnauthorized)
			encoder.Encode(AuthErrorResponse{Error: err.Error()})
			return
		}
		//return bad request ketika field token tidak ada
		w.WriteHeader(http.StatusBadRequest)
		encoder.Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	//return unauthorized ketika token sudah tidak valid (biasanya karena token expired)
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		encoder.Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	err = api.usersRepo.ChangeStatus(false, claims.Email)

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		encoder.Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	c := http.Cookie{
		Name:   "token",
		MaxAge: -1,
	}
	http.SetCookie(w, &c)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("logged out"))
}

func (api *API) register(w http.ResponseWriter, req *http.Request) {
	api.AllowOrigin(w, req)
	var user Register
	err := json.NewDecoder(req.Body).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)

	if api.usersRepo.IsDuplicateEmail(user.Email) {
		encoder.Encode(AuthErrorResponse{Error: "email is already exist"})
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if api.usersRepo.IsDuplicatePass(user.Password) {
		encoder.Encode(AuthErrorResponse{Error: "password is already exist"})
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	res, err := api.usersRepo.InsertUser(user.Name, user.Email, user.Password, user.Role)
	if err != nil {
		encoder.Encode(AuthErrorResponse{Error: err.Error()})
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	//Deklarasi expiry time untuk token jwt
	expirationTime := time.Now().Add(60 * time.Minute)

	//Buat claim mengguankan variable yang sudah didefinisikan diatas
	claims := &Claims{
		Email: *res,
		Role:  user.Role,
		StandardClaims: jwt.StandardClaims{
			//expiry time menggunakan time millisecond
			ExpiresAt: expirationTime.Unix(),
		},
	}

	secretKey := getSecretKey()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	//Buat jwt string dari token yang sudah dibuat mengunakan JWT key yang telah dideklarasikan
	tokenString, err := token.SignedString([]byte(secretKey))
	if err != nil {
		//return internal error ketika ada kesalahan ketika pembuatan JWT string
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	//Set token string kedalam cookie response
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
		Path:    "/",
	})

	json.NewEncoder(w).Encode(RegisterSuccessResponse{Email: *res, Token: tokenString})
	w.WriteHeader(http.StatusCreated)
}
