import React, { Component } from 'react';

import Question from './Question';
import Answer from './Answer';
import Sorts from './Sorts';

const ContainType = Symbol('ContainType');
const lsName = 'lsData';

class App extends Component {
  constructor(props) {
    super(props);
    let ls = localStorage.getItem(lsName);
    let state;
    try {
      state = JSON.parse(ls)
    } catch(e) {

    }
    this.state =  state ? state : {
      project: '京东用户体验调研语词分析工具',
      questions: [{
        question: 'ab',
        isActive: true,
        answers: ['20', '404', '50', 'ab', 'dddf', '202'],
        sorted: [{
          answers: [],
          conditions: [],
          isActive: true,
          name: 'atype',
          showPannel: false
        }]
      }]
    };


    this.handlerTabClick = this.handlerTabClick.bind(this);
    this.handlerSortClick = this.handlerSortClick.bind(this);
    this.handlerTabAddClick = this.handlerTabAddClick.bind(this);
    this.handlerAnswerClick = this.handlerAnswerClick.bind(this);
    this.handlerAddAnswerClick = this.handlerAddAnswerClick.bind(this);
    this.handlerAddsortClick = this.handlerAddsortClick.bind(this);
    this.handlerPannelClose = this.handlerPannelClose.bind(this);
    this.handlerAddConditionClick = this.handlerAddConditionClick.bind(this);
    this.handlerConditionDelClick = this.handlerConditionDelClick.bind(this);
    this.handlerSortDbClick = this.handlerSortDbClick.bind(this);

    var me = this;
    window.addEventListener("beforeunload", function (e) {
      localStorage.setItem(lsName, JSON.stringify(me.state));
    });
  }


  handlerSortDbClick(idx, evt) {
    evt.preventDefault();
    console.log(idx);
    let state = this.state;
    let selected = state.questions.find(q => {
      return q.isActive;
    });
    let currentSort = selected.sorted.find(q => {
      return q.isActive;
    })
    currentSort.showPannel = true;
    this.setState(state);
  }
  
  handlerConditionDelClick(idx) {
    let state = this.state;
    let selected = state.questions.find(q => {
      return q.isActive;
    });
    let currentSort = selected.sorted.find(q => {
      return q.isActive;
    })
    currentSort.conditions.splice(idx, 1);

    this.sortQuestions(selected, currentSort, currentSort.conditions);
    this.sortQuestions(currentSort, selected, currentSort.conditions, true);
    this.setState(state);
  }

  handlerAddConditionClick(val) {
    if (!val) {
        return;
    }
    let state = this.state;
    let selected = state.questions.find(q => {
      return q.isActive;
    });
    let currentSort = selected.sorted.find(q => {
      return q.isActive;
    })
    const con = {
      name: val,
      filter: ContainType
    };
    currentSort.conditions.push(con);

    this.sortQuestions(selected, currentSort, currentSort.conditions);
    this.sortQuestions(currentSort, selected, currentSort.conditions, true);
    this.setState(state);
  }

  sortQuestions(selected, currentSort, cons, isreverse) {
    let tmp = [];
    selected.answers.forEach(item => {
      let match = true && cons.length;
      for (let i = 0, l = cons.length; i < l; i++) {
        if (!(item.indexOf(cons[i].name) > -1)) {
          match = false;
          break;
        }
      }
      if (isreverse) {
        if (!match) {
          currentSort.answers.push(item);
        } else {
          tmp.push(item);
        }
      } else {
        if (match) {
          currentSort.answers.push(item);
        } else {
          tmp.push(item);
        }
      }
    })
    selected.answers = tmp;
  }

  handlerPannelClose() {
    let state = this.state;
    let selected = state.questions.find(q => {
      return q.isActive;
    });
    let currentSort = selected.sorted.find(q => {
      return q.isActive;
    })
    currentSort.showPannel = false;
    this.setState(state);
  }
  
  handlerAddsortClick(val) {
    let state = this.state;
    let selected = state.questions.find(q => {
      return q.isActive;
    });
    if (!selected) {
      return;
    }
    selected.sorted.map(q => {
      q.isActive = false;
      q.showPannel = false;
      return '';
    });

    selected.sorted.push({
      isActive: true,
      name: val,
      answers: [],
      showPannel: true,
      conditions: []
    });
    this.setState(state);
  }

  handlerAddAnswerClick() {
    let text = document.querySelector('.textarea textarea');
    let data = this.state;
    let selected = data.questions.find(q => {
      return q.isActive;
    });
    if (!selected) {
      return;
    }
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
    let currentSort = selected.sorted.find(q => {
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
    let state = this.state;
    state.questions.map((q, idx) => {
      q.isActive = idx === i ? true : false;
      return '';
    });
    let selected = state.questions.find(q => {
      return q.isActive;
    });
    let currentSort = selected.sorted.find(q => {
      return q.isActive;
    });
    if (!currentSort) {
      if (selected.sorted.length) {
        selected.sorted[0].isActive = true;
      }
    }
    this.setState(state);
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
    let currentSort;

    if (selected) {
      currentSort = selected.sorted.find(q => {
        return q.isActive;
      }) || selected.sorted[0] || {};
    }
  
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
          <Answer items={selected ? selected.answers : []}
                  handlerClick={this.handlerAnswerClick}
                  handlerAdd={this.handlerAddAnswerClick}
                  type="A"/>
          <Sorts items={selected ? selected.sorted : []}
            handlerClick={this.handlerSortClick}
            handlerSortDbClick={this.handlerSortDbClick}
            handlerPannelClose={this.handlerPannelClose}
            handlerAddConditionClick={this.handlerAddConditionClick}
            handlerConditionDelClick={this.handlerConditionDelClick}
            handlerAddsortClick={this.handlerAddsortClick}/>
          <Answer items={currentSort ? currentSort.answers : []} handlerClick={this.handlerAnswerClick} type="S"/>
        </div>
      </div>
    );
  }
}

export default App;
