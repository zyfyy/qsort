import React, { Component } from 'react';
import Input from './Input';
import Addsort from './Addsort';



class Sorts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toadd: ''
        }
    }

    render() {
        const currentSort = this.props.items.find(item => {
            return item.isActive;
        });
        let currentConditions = [];
        if (currentSort) {
            currentConditions = currentSort.conditions;
        }

        return (
            <div className="sort">
                {this.props.items.map((item, idx) => {
                    return (
                    <p key={item.name}
                        className={item.isActive ? 'active' : ''}
                        onDoubleClick={(evt) => this.props.handlerSortDbClick(idx, evt)}
                        onClick={() => this.props.handlerClick(idx)}>
                        <span>{item.name} </span>
                        <span>{item.answers.length}</span>
                    </p>
                    )
                })}
                <Addsort handlerClick={this.props.handlerAddsortClick}/>
                <div className="sortpannel" style={{display: currentSort && currentSort.showPannel ? 'block' : 'none'}}>
                    <span>{currentSort && currentSort.name}</span>
                    <hr />
                    {currentConditions.map((con, idx) => {  
                        con = {idx, ...con};
                        return <Input  key={idx}  {...con} handlerClose={this.props.handlerConditionDelClick}/>
                    })}
                    <hr />
                    <Input button="筛选" class="addInput"
                        handlerClick={this.props.handlerAddConditionClick}
                        value={this.state.toadd}/>
                    <span onClick={this.props.handlerPannelClose}>关闭</span>
                </div>
            </div>
        );
    }
}
export default Sorts;
