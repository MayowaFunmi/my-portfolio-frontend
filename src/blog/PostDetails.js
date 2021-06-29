import React, { Component } from 'react'
import AuthHandler from '../utils/AuthHandler'
import Config from '../utils/Config'

class PostDetails extends Component {
    // var pathname = window.location.pathname;
    // var n = pathname.charAt(pathname.length-1)
    constructor(props) {
        super(props)
    
        this.state = {
            post_id: props.match.params.id,
            posts: []
        }
    }
    
    componentDidMount() {
        this.getPostDetails()
    }

    getPostDetails() {
        fetch(Config.blogPostUrl + "" + this.state.post_id + "/", {
            headers: {
                Authorization: "JWT " + AuthHandler.getLoginToken()
            },
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            this.setState({ posts: data })
            console.log(this.state.posts)
        })
        .catch(function(error) {
            console.log('ERROR: ', error)
        })
    }
    
    render() {

        return (
            <div className='card' style={{width:'30rem'}}>
                <div className='card-body'>
                    <h6 className='card-subtitle mb-2 text-muted'>{this.state.posts.category}</h6>
                    <h5 className='card-title'>{this.state.posts.title}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>by {this.state.posts.user}</h6>
                    <h6 className='card-subtitle mb-2 text-muted'>{new Date(this.state.posts.created).toLocaleString()}</h6>
                    <p className='card-text'>{this.state.posts.body}</p>
                </div>
            </div>
        )
    }
}

export default PostDetails
