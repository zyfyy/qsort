import React, { Component } from 'react';

class Question extends Component {
    render() {
        return (
            <li className={this.props.active ? 'active' : ''}
                onClick={this.props.onClick}
            >{this.props.name}</li>
        );
    }
}

export default Question;
