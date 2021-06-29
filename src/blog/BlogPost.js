import React, { Component } from 'react'
import ApiHandler from '../utils/ApiHandler';
import AuthHandler from '../utils/AuthHandler'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { Event } from '@material-ui/icons';

class BlogPost extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    

    state = {
        all_categories: [],
    }

    componentDidMount() {
        this.allCategory()
    }

    async allCategory() {
        var category = new ApiHandler();
        var response = await category.fetchCategories();
        this.setState({ all_categories: response.data })
    }

    async handleSubmit(event) {
        console.log('working')
        event.preventDefault()

        var api_handler = new ApiHandler();
        var response = await api_handler.createPost(
            event.target.user.value,
            event.target.category.value,
            event.target.title.value,
            event.target.body.value,
        );
        //window.location = "/blog_post_list"
        console.log(response)
        window.location = '/'
    }
    
    render() {

    var username = AuthHandler.getUsername();

        return (
            <div className='container'>
                <div className='row justify-content-md-center'>
                    <div className='col-md-auto'>
                        <div>
                            <h2>Welcome To My Portfolio Mini Blog Site</h2>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    Post By:
                                </span>
                                <input 
                                    type='text'
                                    name='user'
                                    className="form-control"
                                    value={username}
                                    readOnly={true}
                                />
                            </div>

                            <div className='input-group flex-nowrap'>
                                <span className="input-group-text" id="addon-wrapping">
                                    Choose Category:
                                </span>
                                {this.state.all_categories.map((category) => {
                                    return(
                                        <div className="form-check" key={category.id}><br />
                                            <input 
                                                name='category'
                                                className="form-check-input"
                                                type='checkbox' 
                                                value={category.name}
                                                id="flexCheckDefault"
                                            />
                                            {category.name};<br />
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">
                                    Post Title:
                                </span>
                                <input 
                                    type="text"
                                    name='title'
                                    className="form-control" 
                                    placeholder="Add Post Title" 
                                />
                            </div>

                            <div className='input-group flex-nowrap'>
                                <span className="input-group-text" id="addon-wrapping">
                                    Post Body:
                                </span>
                                <textarea
                                    type='text'
                                    name='body' 
                                    rows="5" 
                                    placeholder='Add Post Message...' 
                                    className='form-control' 
                                />
                            </div>

                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button">Add Post</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default BlogPost
