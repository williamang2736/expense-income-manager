// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";
import axios from "axios";

export default (type, params) => {
  // called when the user attempts to log in
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    return axios
      .post("/api/auth/login", { username, password })
      .then(({ data }) => {
        if (data && data.token && data.user) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user.username);
        }
      })
      .catch(error => {
        // error.response.data.message
        return Promise.reject();
      });
  }
  // called when the user clicks on the logout button
  if (type === AUTH_LOGOUT) {
    const token = localStorage.getItem("token");
    console.log("called");
    return axios
      .post(
        "/api/auth/logout",
        {},
        {
          headers: { Authorization: `Token ${token}` }
        }
      )
      .then(({ data }) => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
      })
      .catch(err => {
        alert(err);
      });
  }
  // called when the API returns an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  }
  // called when the user navigates to a new location
  if (type === AUTH_CHECK) {
    return localStorage.getItem("username") && localStorage.getItem("token")
      ? Promise.resolve()
      : Promise.reject();
  }
  return Promise.reject("Unknown method");
};
