import React,{ Component } from 'react';
import '../styles/panel.css'
import { connect } from 'react-redux';

import TodoTaskItem from './TodoTaskItem';

class Panel extends Component{
	render(){
		return (
			<div className="panel">
				<span className="icon-box">待办</span>
				<div className="items-wrapper">
					{ this.getTodoItems() }
				</div>
			</div>
		)
	}

	getTodoItems = () => {
		if( !this.props.todos.length ){
			return <span className="info">无待办项</span>;
		}

		return this.props.todos.map((text,index) => {
			return (
				<TodoTaskItem 
					text={text} 
					key={text+index} 
					index={index}
				/>
			)
		})
	}
}

export default connect((store) => {
	return {
		todos:store.todos
	}
})(Panel);


