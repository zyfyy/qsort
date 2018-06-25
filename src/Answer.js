import React, { Component } from 'react';

class Answer extends Component {
    render() {
        const type = this.props.type;
        const items = this.props.items || [];
        if (type === 'A' && !items.length) {
            return (
                <div className="textarea">
                    <textarea ></textarea>
                    <button className="addAnwser" onClick={this.props.handlerAdd}>add</button>
                </div>
            );
        } else {
            return (
                <div className="answer">
                {
                    items.map((item, idx) => {
                        return <p key={idx} onClick={() => this.props.handlerClick(idx, type)}><span>{item}</span></p>
                    })
                }
                </div>
            );
        }
    }
}

export  default Answer;
