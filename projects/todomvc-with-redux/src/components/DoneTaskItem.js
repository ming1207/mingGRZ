import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../styles/taskItem.css'
import '../styles/font-icon.css'

class DoneTaskItem extends Component{
	render(){
		return (
			<div className="item-wrapper">
				<span className="icon-checkmark done-item"
					onClick = { this.checkHandler }
				></span>
				<span className="message done-task">{ this.props.text }</span>
				<span className="icon-cancel"
					onClick = { this.deleteHandler }
					></span>
			</div>
		)
	}

	checkHandler = () => {
		const {
			dispatch,index
		} = this.props;

		dispatch({
			type:'GET_DONE_TODO',
			payload:{
				index
			}
		})
	}

	deleteHandler = () => {
		if( !confirm("DELETE?") ) return;
		
		const {
			dispatch,index
		} = this.props;

		dispatch({
			type:'DELETE_DONE',
			payload:{
				index
			}
		})
	}
}

export default connect()(DoneTaskItem);