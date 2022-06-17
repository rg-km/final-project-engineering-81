package api

import (
	"encoding/json"
	"net/http"
)

type UsersListErrorResponse struct {
	Error string `json:"error"`
}

type User struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	Loggedin bool   `json:"loggedin"`
}

type UsersListSuccessResponse struct {
	Users []User `json:"users"`
}

func (api *API) userList(w http.ResponseWriter, req *http.Request) {
	api.AllowOrigin(w, req)
	encoder := json.NewEncoder(w)

	response := UsersListSuccessResponse{}
	response.Users = make([]User, 0)

	users, err := api.usersRepo.FetchUsers()

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		encoder.Encode(UsersListErrorResponse{Error: err.Error()})
		return
	}

	for _, user := range users {
		response.Users = append(response.Users, User{
			Name:     user.Name,
			Email:    user.Email,
			Role:     user.Role,
			Loggedin: user.Loggedin,
		})
	}

	encoder.Encode(response)
}
