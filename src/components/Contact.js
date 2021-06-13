import React from 'react';
import axios from 'axios';
import Messages from './Messages';

class Contact extends React.Component {

  constructor() {
    super();
    this.state = {
        contacts: [],
        full_name: '',
        email: '',
        phone_number: '',
        address: '',
        message: '',
    }
    this.inputChanged = this.inputChanged.bind(this)
    this.fetchSubmit = this.fetchSubmit.bind(this)
  }

  componentWillMount() {
    this.fetchContacts()
  }

  fetchContacts() {
    fetch('http://127.0.0.1:8000/portfolio/list_contacts')
    .then(response => response.json())
    .then(data =>
        this.setState({
            contacts: data
        })
        )
    .catch(function(error) {
        console.log('ERROR: ', error)
    })
  }

  fetchSubmit(e) {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/portfolio/create_contact/', {
        method:'POST',
        body: JSON.stringify(this.state),
        headers: {
            'Content-type': 'application/json'
        },
    })
    .then(response => response.json())
    .then((data) => 
        this.setState({
            contacts: data
        })
    );
    this.resetForm()
  }

  inputChanged = e => {
	  this.setState({[e.target.name]: e.target.value})
  }

  resetForm(){this.setState(
    {full_name: '', email: '', phone_number: '', address: '', message: ''}
  )}

  render() {
    var messages = this.state.contacts;
    return(
        <div>
          <form id="contact-form" onSubmit={this.fetchSubmit} method="POST">
            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" 
                name='full_name'
                className="form-control"
                value={this.state.full_name}
                onChange={this.inputChanged}
              />
            </div>
  
            <div className="form-group">
              <label>Email Address:</label>
              <input type="email" 
                name='email'
                className="form-control"
                value={this.state.email}
                onChange={this.inputChanged}
              />
            </div>
  
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="text"
                name='phone_number'
                className="form-control" 
                value={this.state.phone_number} 
                onChange={this.inputChanged} 
              />
            </div>
  
            <div className="form-group">
              <label>Address:</label>
              <input type="text" 
                name='address'
                className="form-control"
                value={this.state.address}
                onChange={this.inputChanged}
              />
            </div>
  
            <div className="form-group">
              <label>Message:</label>
              <textarea className="form-control"
                name='message'
                rows="5" 
                value={this.state.message}
                onChange={this.inputChanged}
              />
            </div>
  
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>

          <div>
            {/*
              if user is admin, display contact messages
            */}
            <h2>My Contact Messages:</h2>
            {messages.map(message => {
              return(
                <div key={message.id}>
                  <Messages
                    full_name={message.full_name}
                    email={message.email}
                    phone_number={message.phone_number}
                    address={message.address}
                    message={message.message}
                    sent={message.sent}
                  />
                  <br />
                </div>
              )
            })}
          </div>
        </div>
      );
  }

}

export default Contact;