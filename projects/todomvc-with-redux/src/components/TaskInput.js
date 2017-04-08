import React,{ Component } from 'react';
import '../styles/taskInput.css';
import { connect } from 'react-redux'

class TaskInput extends Component{
	render(){
		return (
			<input 
				placeholder="请在这里填写待办事项"
				className="task-input" 
				onKeyDown={ this.keyDownHandler }
				ref="taskInput"
				/>
		)
	}

	keyDownHandler = (ev) => {
		if( ev.key === 'Enter' ){
			const {
				dispatch
			} = this.props

			if( !ev.target.value ) return;

			dispatch({
				type:'CREATE_TODO',
				payload:{
					text:ev.target.value
				}
			})

			this.refs.taskInput.value = "";
		}
	}
}

export default connect()(TaskInput);


