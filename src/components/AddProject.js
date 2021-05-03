import React, { Component } from 'react';
import axios from 'axios';

class AddProject extends Component {

    constructor() {
        super()
    
        this.state = {
            id: null,
            name: '',
            description: '',
            github_link: '',
            demo_link: '',
            image: null,
            date_published: '',
            show: false
        }
        this.inputChanged = this.inputChanged.bind(this)
        this.imageChanged = this.imageChanged.bind(this)
        this.projectSubmit = this.projectSubmit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    // using fetch api
    projectSubmit(e){
        e.preventDefault()
        fetch('http://127.0.0.1:8000/portfolio/create_project/', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then(response => response.json())
        .then((data) => console.log(data));        
    }

    // using axios
    handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name', this.state.name);
        form_data.append('description', this.state.description);
        form_data.append('github_link', this.state.github_link);
        form_data.append('demo_link', this.state.demo_link);
        form_data.append('date_published', this.state.date_published);
        form_data.append('image', this.state.image, this.state.image.name);

        let url = 'http://127.0.0.1:8000/portfolio/create_project/';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }

    inputChanged = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    imageChanged = e => {
        this.setState({image:e.target.files[0]});
        
    }

    render() {
        //const { id, name, description, github_link, demo_link, image, date_published } = this.state.projects
        // use value={name} etc
        return (
            <div>
                <h1>Add New Project</h1>

                <form onSubmit={this.handleSubmit} id='form' encType='"multipart/form-data'>
                        <label>Name:</label>
                        <input 
                            type='text' 
                            name='name' 
                            placeholder='Add Project Name' 
                            className='form-control'
                            value={this.state.name}
                            onChange={this.inputChanged}
                        />
                        <br />

                        <label>Description:</label>
                        <textarea
                            type='text' 
                            name='description' 
                            rows="5" 
                            placeholder='Project Description' 
                            className='form-control' 
                            value={this.state.description}
                            onChange={this.inputChanged}
                        />
                        <br />

                        <label>Github Link:</label>
                        <input 
                            type='url' 
                            name='github_link' 
                            placeholder='Add Github URL' 
                            className='form-control'
                            value={this.state.github_link}
                            onChange={this.inputChanged}
                        />
                        <br />

                        <label>Demo Page Link:</label>
                        <input 
                            type='url' 
                            name='demo_link' 
                            placeholder='Add Project Demo Page Link' 
                            className='form-control'
                            value={this.state.demo_link}
                            onChange={this.inputChanged}
                        />
                        <br />

                        <label>Add Project image:</label>
                        <input 
                            type='file' 
                            name='image' 
                            className='form-control' 
                            onChange={this.imageChanged}
                        />
                        <br />

                        <label>Date of Deployment:</label>
                        <input 
                            type='date' 
                            name='date_published' 
                            className='form-control'
                            value={this.state.date_published}
                            onChange={this.inputChanged}
                        />
                        <br />

                        <input type='submit' name='Add Project' className='btn btn-success' />
                    </form>
            </div>
        )
    }
}

export default AddProject
