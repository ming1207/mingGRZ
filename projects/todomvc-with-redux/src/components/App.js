import React, { Component } from 'react';
import '../styles/app.css';
import '../styles/font-icon.css';

import TaskInput from './TaskInput';
import TodoPanel from './TodoPanel';
import DonePanel from './DonePanel';

class App extends Component {
  render() {
    return (
      <div className="container">
      	<TaskInput/>
      	<div className="wrapper">
      		<TodoPanel/>
      		<DonePanel/>
      	</div>
      </div>
    );
  }
}

export default App;
