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

    componentWillMount() {
        this.showPosts()
    }

    async showPosts() {
        var posts = new ApiHandler();
        var response = await posts.fetchPosts();
        this.setState({ all_posts: response.data })
        //console.log(this.state.all_posts)
    }

    async PostDetails(post_id) {
        var post_detail = await new ApiHandler()
        var details = post_detail.fetchPostDetails(post_id)
        console.log(details)

        //window.location = '/blog_post_details/'+post_id;
        this.props.history.push({
            pathname: '/blog_post_details/'+post_id,
            //state: [{ id: details.id, user: details.user, title: details.title, body: details.body, created: details.created }]
        })
    }
    
    render() {
        
        return (
            <div>
                {this.state.login_status == true ? (
                    <Link to='/create_blog_post'>Create Post</Link>
                ) : (
                    ""
                )}
                <div className='post_cards'>
                {this.state.all_posts.map(post => {
                    return (
                        <div key={post.id} className='card' style={{width:'20rem'}}>
                            <div className='card-body'>
                                <h6 className='card-subtitle mb-2 text-muted'>Category: {post.category}</h6>
                                <h5 className='card-title'>{post.title}</h5>
                                <h6 className='card-subtitle mb-2 text-muted'>by {post.user}</h6>
                                <h6 className='card-subtitle mb-2 text-muted'>{new Date(post.created).toLocaleString()}</h6>
                                <p className='card-text'>{post.body.substr(0, 40)}...</p>
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
