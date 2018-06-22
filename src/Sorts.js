import React, { Component } from 'react';
import Input from './Input';

class Sorts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPannel: false,
            conditions: [{
                name: 'abc',
                value: 'def'
            }],
            toadd: ''
        }
        this.handlerClick = this.handlerClick.bind(this);
        this.handlerAddClick = this.handlerAddClick.bind(this);
    }

    handlerClick() {
        this.setState({showPannel: true});
    }

    handlerAddClick(evt) {
        console.log(evt);
        let state = this.state;
        state.toadd = evt.target.value;
        this.setState(state);
    }

    render() {
        return (
            <div className="sort">
                {this.props.items.map((item, idx) => {
                    return (
                    <p key={item.name}
                        className={item.isActive ? 'active' : ''}
                        onClick={() => this.props.handlerClick(idx)}>
                        onClick={this.props.onClick}
                        <span>{item.name} </span>
                        <span>{item.answers.length}</span>
                    </p>
                    )
                })}
                <button onClick={this.handlerClick}>筛选</button>
                <div className="sortpannel" style={{display: this.state.showPannel ? 'block' : 'none'}}>
                    <Input name="定义: " class="define"/>
                    {this.state.conditions.map((con, idx) => {
                        return <Input key={idx} name={`${con.name}: `} value={con.value}/>
                    })}
                    <hr />
                    <Input button="添加条件" class="addInput" handlerClick={this.handlerAddClick} value={this.state.toadd}/>
                </div>
            </div>
        );
    }
}
export default Sorts;
