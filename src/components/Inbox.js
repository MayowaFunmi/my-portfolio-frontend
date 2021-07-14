import React, { Component } from 'react'
import ApiHandler from '../utils/ApiHandler'

class Inbox extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
            all_contacts: [],
        }
    }
    
    componentDidMount() {
        this.allContacts()
    }

    async allContacts() {
        var contacts = new ApiHandler()
        var response = await contacts.fetchContacts()
        this.setState({ all_contacts: response.data })
    }

    render() {
        return (
            <div className='contacts' style={{ marginTop: '100px'}}>
                <h2>My Contact Messages:</h2>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>S/N</th>
                            <th scope='col'>Full Name</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Message</th>
                            <th scope='col'>Phone Number</th>
                            <th scope='col'>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.all_contacts.map(contact => {
                            return (
                                <tr key={contact.id}>
                                    <th scope='row'>{contact.id}</th>
                                    <td>{contact.full_name}</td>
                                    <td>{contact.address}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.message}</td>
                                    <td>{contact.phone_number}</td>
                                    <td>{new Date(contact.sent).toLocaleString()}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Inbox
