import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import AuthHandler from '../utils/AuthHandler';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import './Login.css'

class Login extends Component {

    state = {
        username: '',
        password: '',
        btnDisabled: true,
        loginStatus: 0,
    }

    saveInputs = (event) => {
        var key = event.target.name;
        this.setState({ [key]: event.target.value });
        if (this.state.username != "" && this.state.password != "") {
          this.setState({ btnDisabled: false });
        } else {
          this.setState({ btnDisabled: true });
        }
    };

    formSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.setState({ loginStatus: 1 });
        AuthHandler.login(
          this.state.username,
          this.state.password,
          this.handleAjaxResponse
        );
    };

    handleAjaxResponse = (data) => {
        console.log(data);
        if (data.error) {
          this.setState({ loginStatus: 4 });
        } else {
          this.setState({ loginStatus: 3 });
          window.location = '/';
        }
    };

    getMessages = () => {
        if (this.state.loginStatus === 0) {
          return "";
        } else if (this.state.loginStatus === 1) {
          return (
            <div className="alert alert-warning">
              <strong>Logging in!</strong> Please Wait...
            </div>
        );
        } else if (this.state.loginStatus === 3) {
          return (
            <div className="alert alert-success">
              <strong>Login Successfull!</strong>
            </div>
          );
        } else if (this.state.loginStatus === 4) {
          return (
            <div className="alert alert-danger">
              <strong>Invalid Login Details</strong>
            </div>
          );
        }
    };

    render() {

        return (
            <div className='container'>
                <div className='row justify-content-md-center'>
                    <div className='col-md-auto'>
                        <div>
                            <h2>Login Form:</h2>
                        </div>

                        <form onSubmit={this.formSubmit}>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    <PersonIcon />
                                </span>
                                <input 
                                    type="text"
                                    name='username'
                                    className="form-control" 
                                    placeholder="Username" 
                                    required={true}
                                    onChange={this.saveInputs}
                                />
                            </div>

                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    <LockOpenIcon />
                                </span>
                                <input 
                                    type="password"
                                    name='password'
                                    className="form-control" 
                                    placeholder="Password" 
                                    required={true}
                                    onChange={this.saveInputs}
                                />
                            </div>

                            <div className='my_button'>
                                <button className="btn btn-primary">
                                    <Link to='/signup'>SignUp Now</Link>
                                </button>

                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={this.state.btnDisabled}
                                >
                                    SIGN IN
                                </button>
                            </div>

                            <div className="">{this.getMessages()}</div>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
