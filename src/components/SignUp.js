import React, { Component } from 'react'
import ApiHandler from '../utils/ApiHandler';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import './SignUp.css'
import NavBar from './NavBar';

class SignUp extends Component {

    constructor() {
        super()
        this.fetchSubmit = this.fetchSubmit.bind(this)
    }

    async fetchSubmit(event) {
        event.preventDefault();

        var api_handler = new ApiHandler();
        var response = await api_handler.signUp(
            event.target.username.value,
            event.target.password.value,
            event.target.password2.value,
            event.target.email.value,
            event.target.first_name.value,
            event.target.last_name.value,
        );
        window.location = '/login'
    }
    
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className='container'>
                <div className='row justify-content-md-center'>
                    
                    <div className='col-md-auto'>
                    <div>
                        <h2>SignUp / Registration Form:</h2>
                    </div>
                    <form onSubmit={this.fetchSubmit}>
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                            <PersonIcon />
                        </span>
                        <input 
                            type="text"
                            name='username'
                            className="form-control" 
                            placeholder="Username" 
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
                        />
                    </div>

                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                            <EmailIcon />
                        </span>
                        <input 
                            type="password"
                            name='password2'
                            className="form-control" 
                            placeholder="Confirm Password" 
                        />
                    </div>

                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                            <LockOpenIcon />
                        </span>
                        <input 
                            type="email"
                            name='email'
                            className="form-control" 
                            placeholder="Email Address" 
                        />
                    </div>

                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                            <PersonIcon />
                        </span>
                        <input 
                            type="text"
                            name='first_name'
                            className="form-control" 
                            placeholder="Enter Your First Name" 
                        />
                    </div>

                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">
                            <PersonIcon />
                        </span>
                        <input 
                            type="text"
                            name='last_name'
                            className="form-control" 
                            placeholder="Enter Your Last Name" 
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Sign Up</button>

                </form>
                    </div>
                </div>
            </div>
            </React.Fragment>
            
        )
    }
}

export default SignUp
