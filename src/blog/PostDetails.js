import React, { Component } from 'react'
import AuthHandler from '../utils/AuthHandler'
import Config from '../utils/Config'
import './PostDetail.css'
import { Link } from 'react-router-dom'
import MessageIcon from '@material-ui/icons/Message';
import PersonIcon from '@material-ui/icons/Person';
import BlockIcon from '@material-ui/icons/Block';

class PostDetails extends Component {
    // var pathname = window.location.pathname;
    // var n = pathname.charAt(pathname.length-1)
    constructor(props) {
        super(props)
    
        this.state = {
            post_id: props.match.params.id,
            posts: [],
            comments: [],
            post_comment: [],
            status: false,
            btnDisabled: true,
            messageStatus: 0,
            user: '',
            post: props.match.params.id,
            body: ''
        }
        this.inputChanged = this.inputChanged.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        this.getPostDetails()
        this.checkLogin()
    }

    getPostDetails() {
        fetch(Config.blogPostUrl + "" + this.state.post_id + "/", {
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ posts: data })
            this.setState({ post_comment: this.state.posts.comments })
        })
        .catch(function(error) {
            console.log('ERROR: ', error)
        })
    }


    async checkLogin() {
        var check_login = AuthHandler.loggedIn();
        if (check_login) {
            this.setState({ status: true })
        } else {
            this.setState({ status: false })
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({ messageStatus: 1 })
        fetch(Config.commentUrl, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json',
                Authorization: "JWT " + AuthHandler.getLoginToken(),
            }
        })
        .then(response => response.json())
        .then((data) => 
            this.setState({ comments: data }),
            this.setState({ messageStatus: 2 })
        );
        this.getMessages()
        //console.log(this.state.comments)
        window.location = '/blog_post_details/'+this.state.post_id;
    }

    inputChanged = e => {
        this.setState({[e.target.name]: e.target.value});
        if (this.state.body != '') {
            this.setState({ btnDisabled: false })
        } else {
            this.setState({ btnDisabled: true })
        }
    }

    getMessages = () => {
        if (this.state.messageStatus == 0) {
          return '';
        } else if (this.state.messageStatus == 1) {
          return (
            <div className="alert alert-warning">
              <strong>Adding Your Comment</strong> Please Wait...
            </div>
          )
        } else if(this.state.messageStatus == 2) {
          return (
            <div className="alert alert-success">
              <strong>Comment Added Successfully</strong>
            </div>
          )
        } else {
          return (
            <div className="alert alert-danger">
              <strong>Failed To Add Comment</strong>
            </div>
          )
        }
      }
    
    render() {
        var username = AuthHandler.getUsername();
        if (this.state.status) {
            return (

                <div className='container'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-auto'>
                            <div className='card' style={{width:'30rem'}}>
                                <div className='card-body'>
                                    <h6 className='card-subtitle mb-2 text-muted'>Category: {this.state.posts.category}</h6>
                                    <h5 className='card-title'>{this.state.posts.title}</h5>
                                    <h6 className='card-subtitle mb-2 text-muted'>by {this.state.posts.user}</h6>
                                    <h6 className='card-subtitle mb-2 text-muted'>{new Date(this.state.posts.created).toLocaleString()}</h6>
                                    <p className='card-text'>{this.state.posts.body}</p>
                                    <hr />
                                    <hr />
                                    <p className='card-subtitle mb-2 text-muted'>Comments Section. {this.state.post_comment.length} comments for this post.</p>
                                    
                                    <div>
                                        {this.state.post_comment.map(x => {
                                            return (
                                                <div key={x.id}>
                                                    <h6 className='card-subtitle mb-2 text-muted'>sent by {x.user} on {new Date(x.created).toLocaleString()}</h6>
                                                    <p className='card-text'>{x.body}</p>
                                                    <hr />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <hr />
                                    <div>
                                        <h1>Leave A Comment: </h1>
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping">
                                                    <PersonIcon />
                                                </span>
                                                <input 
                                                    type='text'
                                                    name='user'
                                                    className="form-control"
                                                    value={username}
                                                    readOnly={true}
                                                />
                                            </div>

                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text" id="addon-wrapping">
                                                    <MessageIcon />
                                                </span>
                                                <textarea className="form-control"
                                                    name='body'
                                                    rows="5" 
                                                    placeholder='Type something here ...'
                                                    value={this.state.body}
                                                    onChange={this.inputChanged}
                                                />
                                            </div>

                                            <button 
                                                type="submit" 
                                                className="btn btn-primary"
                                                disabled={this.state.btnDisabled}
                                            >
                                                Add Comment
                                            </button>
                                        </form>                                        
                                    </div>
                                </div>
                            </div>
                            <Link to='/list_blog_post'>Show All Post</Link>
                        </div>
                    </div>
                </div>
                
            )
        } else {
            return (

                <div className='container'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-auto'>
                            <div className='card' style={{width:'30rem'}}>
                                <div className='card-body'>
                                    <h6 className='card-subtitle mb-2 text-muted'>Category: {this.state.posts.category}</h6>
                                    <h5 className='card-title'>{this.state.posts.title}</h5>
                                    <h6 className='card-subtitle mb-2 text-muted'>by {this.state.posts.user}</h6>
                                    <h6 className='card-subtitle mb-2 text-muted'>{new Date(this.state.posts.created).toLocaleString()}</h6>
                                    <p className='card-text'>{this.state.posts.body}</p>
                                    <hr />
                                    <hr />
                                    <p className='card-subtitle mb-2 text-muted'>Comments Section. {this.state.post_comment.length} comments for this post.</p>
    
                                    <div>
                                        {this.state.post_comment.map(x => {
                                            return (
                                                <div key={x.id}>
                                                    <h6 className='card-subtitle mb-2 text-muted'> by {x.user} on {new Date(x.created).toLocaleString()}</h6>
                                                    <p className='card-text'>{x.body}</p>
                                                    <hr />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <hr />
                                    <div>
                                        LEAVE A COMMENT:
                                        <h2>
                                            You must log in before writing a comment. <br />
                                            please login <button className='btn btn-info'><Link to='/login'>Here</Link></button> or sign up <button className='btn btn-info'><Link to='/signup'>Here</Link></button>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <Link to='/list_blog_post'>Show All Post</Link>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

export default PostDetails
