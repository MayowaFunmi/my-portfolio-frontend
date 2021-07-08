import React from 'react';
import Messages from './Messages';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneEnabledRoundedIcon from '@material-ui/icons/PhoneEnabledRounded';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import BlockIcon from '@material-ui/icons/Block';

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
        btnDisabled: true,
        messageStatus: 0,
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
    this.setState({ messageStatus: 1 })
    fetch('http://127.0.0.1:8000/portfolio/create_contact/', {
        method:'POST',
        body: JSON.stringify(this.state),
        headers: {
            'Content-type': 'application/json'
        },
    })
    .then(response => response.json())
    .then((data) => 
      this.setState({ contacts: data }),
      this.setState({ messageStatus: 2 })
    );
    this.resetForm()
  }

  getMessages = () => {
    if (this.state.messageStatus == 0) {
      return '';
    } else if (this.state.messageStatus == 1) {
      return (
        <div className="alert alert-warning">
          <strong>Sending Message!</strong> Please Wait...
        </div>
      )
    } else if(this.state.messageStatus == 2) {
      return (
        <div className="alert alert-success">
          <strong>Message Sent Successfully!</strong>
        </div>
      )
    } else {
      return (
        <div className="alert alert-danger">
          <strong>Message Sending Failed!!!</strong>
        </div>
      )
    }
  }

  inputChanged = e => {
	  this.setState({[e.target.name]: e.target.value});
    if (this.state.full_name != '' && this.state.email != '' && this.state.phone_number != '' && this.state.address != '' && this.state.message != '') {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  resetForm(){this.setState(
    {full_name: '', email: '', phone_number: '', address: '', message: ''}
  )}

  render() {
    var messages = this.state.contacts;
    return(
        <div className='container'>
          <div className='row justify-content-md-center'>
            <div className='col-md-auto'>
              <div>
                <h2>Fill The Form Below To Contact Me:</h2>
              </div>
              <form id="contact-form" onSubmit={this.fetchSubmit} method="POST">
                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <PersonIcon />
                  </span>
                  <input 
                    type="text"
                    name='full_name'
                    className="form-control" 
                    placeholder="Enter Your Full Name"
                    value={this.state.full_name}
                    onChange={this.inputChanged}
                 />
                </div>

                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <EmailIcon />
                  </span>
                  <input 
                    type="email"
                    name='email'
                    className="form-control" 
                    placeholder="Enter Your Email Address" 
                    value={this.state.email}
                    onChange={this.inputChanged}
                  />
                </div>

                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <PhoneEnabledRoundedIcon />
                  </span>
                  <input 
                    type="text"
                    name='phone_number'
                    className="form-control" 
                    placeholder="Enter Your Phone Number" 
                    value={this.state.phone_number}
                    onChange={this.inputChanged}
                  />
                </div>

                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <HomeIcon />
                  </span>
                  <input 
                    type="text"
                    name='address'
                    className="form-control" 
                    placeholder="Enter Your Address" 
                    value={this.state.address}
                    onChange={this.inputChanged}
                  />
                </div>

                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <MessageIcon />
                  </span>
                  <textarea className="form-control"
                    name='message'
                    rows="5" 
                    placeholder='Type something here ...'
                    value={this.state.message}
                    onChange={this.inputChanged}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={this.state.btnDisabled}
                >
                  Submit
                </button>

                <div className="">{this.getMessages()}</div>

              </form>

            </div>
          </div>

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