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
        await this.checkLogin();
        var response = await Axios.get(Config.listAllUsersUrl, {
            headers: { Authorization: 'JWT ' + AuthHandler.getLoginToken()}
        })
        return response;
    }

    async fetchContacts() {
        await this.checkLogin();
        var response = await Axios.get(Config.ContactsUrl, {
            headers: { Authorization: 'JWT ' + AuthHandler.getLoginToken()}
        })
        return response;
    }

    async logout() {
        await this.checkLogin();
            var response = await Axios.post(
            Config.logoutUrl, {
                refresh: AuthHandler.getRefreshToken()
            },
            //{headers: { 'Content-Type': 'application/json'}}
            {headers: { Authorization: 'JWT ' + AuthHandler.getLoginToken()}}
        );
        //console.log(response)
        return response;
    }

    async createPost (user, title, body) {
        await this.checkLogin()
        var response = await Axios.post(
            Config.blogPostUrl, {
                user: AuthHandler.getUsername(),
                title: title,
                body: body,
            },
            { headers: { Authorization: "JWT " + AuthHandler.getLoginToken()}}
        );
        console.log(response)
        return response
    }

    async fetchPosts() {
        //await this.checkLogin();
        var response = await Axios.get(Config.blogPostUrl, {
            headers: { 'Content-Type': 'application/json'}
        })
        //console.log(response)
        return response;
    }

    async fetchPostDetails(id) {
        var response = await Axios.get(Config.blogPostUrl + "" + id + "/", {
            headers: { 'Content-Type': 'application/json'}
            //headers: { Authorization: "JWT " + AuthHandler.getLoginToken() },
        })
        //console.log(response)
        return response
    }

    async fetchPostComments(id) {
        var response = await Axios.get(Config.commentUrl + "" + id + "/", {
            headers: { 'Content-Type': 'application/json'}
        })
        return response
    }

    async fetchCategories() {
        await this.checkLogin();
        var response = await Axios.get(Config.blogCategoryUrl, {
            headers: { Authorization: 'JWT ' + AuthHandler.getLoginToken()}
        })
        return response;
    }
}

export default ApiHandler