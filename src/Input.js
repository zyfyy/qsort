import React, { Component } from 'react';

class Input extends Component {
    render() {
        if (this.props.button) {
            return (
                <div>
                    {this.props.name}<input type="text" className={this.props.class}/>
                    <button onClick={this.props.handlerClick}>{this.props.button}</button>
                </div>
            )
        }
        return (
            <div>
                {this.props.name}<input type="text" className={this.props.class}/>
            </div>
        );
    }
}

export default Input;
