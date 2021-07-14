import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Digital from '../clock/Digital'
import ApiHandler from '../utils/ApiHandler'
import AuthHandler from '../utils/AuthHandler'
//import './NavBar.css'

class NavBar extends Component {

    state = {
        all_users: [],
        login_status: false,
        staff_status: false,
        username: '',
        email:'',
        width: window.screen.width,
        buttonClass: '',
    }

    componentDidMount() {
        this.loginCheck()
        this.allUsers()
        //window.addEventListener('resize', this.onscreensize);
        this.onscreensize()
    }

    async allUsers() {
        var users = new ApiHandler();
        var response = await users.fetchAllUsers();
        this.setState({ all_users: response.data })
        var me = AuthHandler.getUsername();
        this.setState({ username: me })
        {this.state.all_users.map((user) => {
            if (user.username == me) {
                this.setState({ staff_status: user.is_superuser })
            }
        })}
        //console.log(this.state.staff_status)
    }

    async loginCheck() {
        var check = AuthHandler.loggedIn();
        if (check) {
            //console.log('user is active')
            //console.log(AuthHandler.getLoginToken())
            //return true;
            this.setState({ login_status: true })
        } else {
            //console.log(AuthHandler.getLoginToken())
            //console.log('user is not active')
            //return false;
            this.setState({ login_status: false })
        }
    }

    onscreensize = () => {
        this.setState({
            width: window.screen.width
        })
        //console.log(window.screen.width);
    }

    render() {
        var navClass = 'navbar navbar-expand-lg navbar-light bg-light fixed-top';
        var className1 = 'navbar-toggler';
        var className2 = 'collapse navbar-collapse'
        if (className1 == 'navbar-toggler collapsed') {
            className2 = 'navbar-collapse collapse';
            console.log('first phase')
        } else if (className1 == 'navbar-toggler' && className2 == 'navbar-collapse collapse show') {
            navClass = 'navbar navbar-expand-lg navbar-light bg-light fixed-top' + ' setMargin';
            console.log('second phase')
        }

        var name = this.state.username;
        if (this.state.login_status && this.state.staff_status) {
            return (
                <div>
                    <nav className='navbar navbar-expand-lg navbar-light bg-light fixed-top'>
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">My Portfolio App</Link>
                            <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className='navbar-collapse collapse' id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/list_blog_post">Blog</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create_blog_post">Add New Post</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/contact_me">Contact Me</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/my_inbox">Inbox</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/add_project">Add Project</Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">Logout</Link>
                                    </li>                                
                                </ul>
                            </div>
                            <h2>Welcome, {name}</h2>
                            <Digital />
                        </div>
                    </nav>
                </div>
            )
        } else if (this.state.login_status && this.state.staff_status == false) {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">My Portfolio App</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/list_blog_post">Blog</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create_blog_post">Add New Post</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/contact_me">Contact Me</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">Logout</Link>
                                    </li>                                
                                </ul>
                            </div>
                            <h2>Welcome, {name}</h2>
                            <Digital />
                        </div>
                    </nav>
                </div>
            )
        } else {
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <div className="container-fluid">
                            <Link className="navbar-brand" to="/">My Portfolio App</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/list_blog_post">Blog</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/contact_me">Contact Me</Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </ul>
                            </div>
                            <h2>Hi, Guest!</h2>
                            <Digital />
                        </div>
                    </nav>
                </div>
            )
        }
        
    }
}

export default NavBar