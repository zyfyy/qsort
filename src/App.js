import React, { Component } from 'react';

import Question from './Question';
import Answer from './Answer';
import Sorts from './Sorts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: '京东用户体验调研语词分析工具',
      questions: [
        {
          question: 'what is this?',
          isActive: true,
          answers: ['abc', 'bbc', 'def'],
          sorted: [{
            isActive: true,
            name: 'aType',
            answers: ['adde']
          },{
            isActive: false,
            name: 'bType',
            answers: ['addefff']
          }]
        },
        {
          question: 'what is that?',
          isActive: false,
          answers: ['abbbc', 'bddbc', 'ccdef'],
          sorted: []
        }
      ]
    }
    this.handlerTabClick = this.handlerTabClick.bind(this);
    this.handlerSortClick = this.handlerSortClick.bind(this);
    this.handlerTabAddClick = this.handlerTabAddClick.bind(this);
    this.handlerAnswerClick = this.handlerAnswerClick.bind(this);
    this.handlerAddAnswerClick = this.handlerAddAnswerClick.bind(this);
  }
  handlerAddAnswerClick() {
    let text = document.querySelector('.textarea textarea');
    let data = this.state;
    let selected = data.questions.find(q => {
      return q.isActive;
    });
    selected.answers = text.value.split('\n').filter(item => {
      return item;
    });
    this.setState(data);
  }
  handlerAnswerClick(i, type) {
    let data = this.state;
    let selected = data.questions.find(q => {
      return q.isActive;
    });
    let currentSort = selected.sorted.find((q, idx)=> {
      return q.isActive;
    });
    if (!currentSort) {
      return;
    }

    if (type === 'A') {
      currentSort.answers.push(selected.answers[i]);
      selected.answers.splice(i, 1);
    } else if (type === 'S') {
      selected.answers.push(currentSort.answers[i]);
      currentSort.answers.splice(i, 1);
    }
    this.setState(data);
  }

  handlerTabAddClick() {
    let data = this.state;
    let input = document.querySelector('.addTabName');
    if (!input.value) {
      input.focus();
      return;
    }
    data.questions.map(q => {
      q.isActive = false;
      return '';
    });
    data.questions.push({
      question: input.value,
      isActive: true,
      answers: [],
      sorted: []
    });
    this.setState(data);
  }
  handlerTabClick(i) {
    let data = this.state;
    data.questions.map((q, idx) => {
      q.isActive = idx === i ? true : false;
      return '';
    });
    this.setState(data);
  }

  handlerSortClick(i) {
    let data = this.state;
    let selected = data.questions.find(q => {
      return q.isActive;
    });
    selected.sorted.map((q, idx)=> {
      q.isActive = idx === i ? true : false;
      return '';
    });
    this.setState(data);
  }

  render() {
    const data = this.state;
    const selected = data.questions.find(q => {
      return q.isActive;
    });
    const currentSort = selected.sorted.find(q => {
      return q.isActive;
    }) || selected.sorted[0] || {};

    return (
      <div className="App">
        <header>
          <h2>{data.project}</h2>
        </header>
        <ul className="tabs">
          {data.questions.map((q, idx)=> {
            return <Question key={idx}
                            name={q.question}
                            index={idx}
                            onClick={() => this.handlerTabClick(idx)}
                            active={q.isActive}
              />
          })}
          <input className="addTabName" type="text" />
          <span onClick={this.handlerTabAddClick} className="addTab">+</span>
        </ul>
        <div className="container">
          <Answer items={selected.answers}
                  handlerClick={this.handlerAnswerClick}
                  handlerAdd={this.handlerAddAnswerClick}
                  type="A"/>
          <Sorts items={selected.sorted} handlerClick={this.handlerSortClick}/>
          <Answer items={currentSort.answers || []} handlerClick={this.handlerAnswerClick} type="S"/>
        </div>
      </div>
    );
  }
}

export default App;
