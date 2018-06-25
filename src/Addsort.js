import React, { Component } from 'react'

class Addsort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toadd: ''
        }
        this.handerChange = this.handerChange.bind(this);
    }

    handerChange(evt) {
        this.setState({
            toadd: evt.target.value 
        })
    }
    render () {
        const toadd = this.state.toadd;
        return (
            <div>
                <input type='text' onChange={this.handerChange} defaultValue={toadd}/>
                <button onClick={() => {this.props.handlerClick(toadd)}}>新增分类</button>
            </div>
        )
    }
}

export default Addsort