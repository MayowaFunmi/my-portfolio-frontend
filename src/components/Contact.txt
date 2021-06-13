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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchSubmit = this.fetchSubmit.bind(this)
  }

  componentWillMount() {
    this.fetchContacts()
  }

  fetchContacts() {
    fetch('http://127.0.0.1:8000/portfolio/contact_me')
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
    fetch('http://127.0.0.1:8000/portfolio/contact_me/', {
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

  // optional
  handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST",
      url:'http://127.0.0.1:8000/portfolio/contact_me/',
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message Sent.");
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }

  inputChanged = e => {
	  this.setState({[e.target.name]: e.target.value})
  }

  resetForm(){this.setState(
    {full_name: '', email: '', phone_number: '', address: '', message: ''}
  )}

  render() {
    var messages = this.state.contacts;

    if (messages.length == 0){
      return <h2>No Messages Yet</h2>
    } else {
      return(
        // display contact messages
        <div>
          <div>
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
        </div>
      );
    }
  }

  // another option
  handleChange(event) {
    const field = event.target.id;
    if (field === "name") {
      this.setState({ name: event.target.value });
    } else if (field === "email") {
      this.setState({ email: event.target.value });
    } else if (field === "message") {
      this.setState({ message: event.target.value });
    }
  }
}

export default Contact;