import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ApiHandler from '../utils/ApiHandler'
import AuthHandler from '../utils/AuthHandler'
import './PostList.css'

class PostList extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            login_status: AuthHandler.loggedIn(),
            all_posts: [],
        }
    }

    componentDidMount() {
        this.showPosts()
    }

    async showPosts() {
        var posts = new ApiHandler();
        var response = await posts.fetchPosts();
        console.log(response)
        this.setState({ all_posts: response.data })
        console.log(this.state.all_posts)
    }

    async PostDetails(post_id) {
        var post_detail = new ApiHandler()
        var details = await post_detail.fetchPostDetails(post_id)
        console.log(details)

        //window.location = '/blog_post_details/'+post_id;
        this.props.history.push({
            pathname: '/blog_post_details/'+post_id,
            //state: [{ id: details.id, user: details.user, title: details.title, body: details.body, created: details.created }]
        })
    }
    
    render() {
        
        return (
            <div className='post_lists'>
                {/*
                <h2>Welcome to the blog /forum section of my portfolio site.</h2>
                {this.state.login_status == true ? (
                    <Link to='/create_blog_post'>Create Post</Link>
                ) : (
                    ""
                )}
                */}
                <div className='post_cards'>
                {this.state.all_posts.map(post => {
                    return (
                        <div key={post.id} className='card' style={{width:'20rem'}}>
                            <div className='card-body'>
                                <h5 className='card-title'>{post.title}</h5>
                                <h6 className='card-subtitle mb-2 text-muted'>by {post.user}</h6>
                                <h6 className='card-subtitle mb-2 text-muted'>{new Date(post.created).toLocaleString()}</h6>
                                <p className='card-text'>{post.body.substr(0, 40)}...</p>
                                <p className='card-subtitle mb-2 text-muted'>This post has {post.comments.length} comments.</p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() =>
                                        this.PostDetails(post.id)
                                      }
                                >
                                    Read More
                                </button>
                            </div>
                        </div>
                    )
                    
                })}
                </div>
            </div>
        )
    }
}

export default PostList
