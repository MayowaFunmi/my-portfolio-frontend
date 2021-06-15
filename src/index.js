import React, { Component } from 'react'

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AddProject from './components/AddProject';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import NavBar from './components/NavBar'

class Index extends Component {

  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Index


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <NavBar />
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Route exact path="/add_project" component={AddProject}></Route>
        <Route exact path="/contact_me" component={Contact}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
