import { reactLocalStorage } from "reactjs-localstorage";
const { default: AuthHandler } = require("./AuthHandler");
const { default: Axios } = require("axios");
const { default: Config } = require("./Config");


class ApiHandler {
    async signUp(username, password, password2, email, first_name, last_name) {
        var response = await Axios.post(
            Config.registerUrl, {
                username: username,
                password: password,
                password2: password2,
                email: email,
                first_name: first_name,
                last_name: last_name,
            },
            { headers: { 'Content-type': 'application/json'}}
        );
        return response;
    }

    async checkLogin() {
        if (AuthHandler.checkTokenExpiry()) {
            try {
                var response = await Axios.post(Config.refreshApiUrl, {
                  refresh: AuthHandler.getRefreshToken(),
                });
    
                reactLocalStorage.set("token", response.data.access);
                console.log('logged in')
            } catch (error) {
                console.log(error);
    
                //Not Using Valid Token for Refresh then Logout the User
                AuthHandler.logoutUser();
                window.location = "/";
            }
        }
    }

    async fetchAllUsers() {
        //await this.checkLogin();
        var response = await Axios.get(Config.listAllUsersUrl, {
            headers: { Authorization: 'JWT ' + AuthHandler.getLoginToken()}
        })
        return response;
    }

    async logout() {
        if (AuthHandler.loggedIn()) {
            var response = await Axios.post(
                Config.logoutUrl, {
                    refresh: AuthHandler.getRefreshToken()
                },
                {headers: { Authorization: 'JWT ' + AuthHandler.getLoginToken()}}
            );
            //console.log(response)
            return response;
        } else {
            //console.log('not logged out')
            return ('')
        }
        
    }
}

export default ApiHandler