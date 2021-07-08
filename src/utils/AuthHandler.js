import axios from "axios";
import Config from "./Config";
import { reactLocalStorage } from "reactjs-localstorage";

class AuthHandler {
  static login(username, password, callback) {
    axios
      .post(Config.loginUrl, { username: username, password: password })
      .then(function (response) {
        if (response.status === 200) {
          reactLocalStorage.set("token", response.data.access);
          reactLocalStorage.set("refresh", response.data.refresh);
          reactLocalStorage.set('username', username);
          callback({ error: false, message: "Login Successfull..." });
        }
      })
      .catch(function (error) {
        callback({
          error: true,
          message: "Error During Login Invalid Login Details..",
        });
      });
  }

  static loggedIn() {
    if (reactLocalStorage.get("token") && reactLocalStorage.get("refresh")) {
      //console.log(reactLocalStorage.get('username'))
      return true;
    } else {
      return false;
    }
  }

  static getUsername() {
    return (reactLocalStorage.get('username'))
  }

  static getLoginToken() {
    return reactLocalStorage.get("token");
  }

  static getRefreshToken() {
    return reactLocalStorage.get("refresh");
  }

  static logoutUser() {
    reactLocalStorage.remove("token");
    reactLocalStorage.remove("refresh");
  }

  static checkTokenExpiry() {
    if (this.loggedIn()) {
      var expire = false;
      var token = this.getLoginToken();
      var tokenArray = token.split(".");
      var jwt = JSON.parse(atob(tokenArray[1]));
      if (jwt && jwt.exp && Number.isFinite(jwt.exp)) {
        expire = jwt.exp * 1000;
      } else {
        expire = false;
      }

      if (!expire) {
        return false;
      }
      //console.log('check login expiry done')
      return Date.now() > expire;
    } else {
      //console.log('check login expiry failed')
      return false;
    }
    
  }

  static getPayload(jwt) {
    if (this.loggedIn()) {
      console.log('user already logged in')
      return atob(jwt.split(".")[1])
    } else {
      console.log('user not available')
      return window.location = '/'
    }
  }

  static TokenExpiry() {
    var payload = this.getPayload(this.getLoginToken());
    var expiration = new Date(payload.exp);
    var now = new Date();
    var fiveMinutes = 1000 * 60 * 5;
    if (expiration.getTime() - now.getTime() <= fiveMinutes) {
      //console.log('token has expired or will soon expire')
      return false
    } else {
      //console.log('token is valid for more than five mins', payload)
      return true
    }
  }
}

export default AuthHandler;
