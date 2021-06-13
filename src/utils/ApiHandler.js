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
}

export default ApiHandler