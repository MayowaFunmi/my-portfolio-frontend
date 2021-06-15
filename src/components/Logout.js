import React from "react";
import { Redirect } from "react-router-dom";
import ApiHandler from "../utils/ApiHandler";
import AuthHandler from "../utils/AuthHandler";

class Logout extends React.Component {

  async logoutUser() {

    var api_handler = new ApiHandler();
    var response = await api_handler.logout(
        
    );
    console.log('logout worked')
    AuthHandler.logoutUser();
    window.location = '/login'
  }


  render() {
    //AuthHandler.logoutUser();
    //return <Redirect to="/login" />;
    return this.logoutUser();
  }
}
export default Logout;
