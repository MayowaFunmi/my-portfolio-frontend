import React, { Component } from 'react'
import Clock from 'react-clock';
import './Analog.css'

class Analog extends Component {

    state = {
        date: new Date(),
    }

    componentDidMount() {
        setInterval(
            () => this.setState({ date: new Date() }), 1000
        )
    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12 btn btn-info'>
                        Analogue Clock
                    </div>
                </div>

                <div className='clk'>
                    <Clock 
                        value={this.state.date}
                    />
                </div>
            </div>
        )
    }
}

export default Analog
