import React from 'react'

const Messages = (props) => {
    return (
        <div>
            <div>
                <b>Full Name:</b>{props.full_name}
            </div>
            <div>
                <b>Email Address:</b>{props.email}
            </div>
            <div>
                <b>Phone Number:</b>{props.phone_number}
            </div>
            <div>
                <b>Contact Address:</b>{props.address}
            </div>
            <div>
                <b>Message:</b>{props.message}
            </div>
            <div>
                <b>Date sent:</b>{props.sent}
            </div>
            
        </div>
    )
}

export default Messages
