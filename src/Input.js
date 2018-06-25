import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handlerChange = this.handlerChange.bind(this);
    }
    handlerChange(evt) {
        this.setState({value: evt.target.value});
    }
    render() {
        const value = this.state.value;
        if (this.props.button) {
            return (
                <div>
                    {this.props.name}<input type="text" className={this.props.class} defaultValue={value} onChange={this.handlerChange}/>
                    <button onClick={() => this.props.handlerClick(value)}>{this.props.button}</button>
                </div>
            )
        } else if (this.props.filter) {
            return (
                <div>
                    <span>{this.props.name}</span>
                    <span onClick={() => this.props.handlerClose(this.props.idx)} > x</span>
                </div>
            )
        } else { 
            return (
                <div>
                    {this.props.name}<input type="text" className={this.props.class}/>
                </div>
            );
        }
       
    }
}

export default Input;
