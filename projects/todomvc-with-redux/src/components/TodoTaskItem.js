import React,{ Component } from 'react';
import { connect } from 'react-redux';
import '../styles/taskItem.css'
import '../styles/font-icon.css'

class TodoTaskItem extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	editing:false,
	  	text:this.props.text
	  };
	}

	componentDidUpdate(props,state){
		if( this.state.editing && !state.editing ){
			this.refs.textInput.focus();
			this.refs.textInput.select();
		}
	}

	render(){
		const {
			editing
		} = this.state;

		return (
			<div className="item-wrapper">
				<span className="icon-checkmark"
					onClick = { this.checkHandler }
					></span>
				<span 
					className="message"
					style={{ display:editing ? 'none' : 'block' }}
					onClick={ this.modify }
					>{ this.props.text }</span>
				<input 
					type="text" 
					value={ this.state.text }
					onChange={ this.changeHandler }
					onKeyDown={ this.endHandler }
					onBlur={ this.endHandler }
					style={{ display:editing ? 'block' : 'none' }}
					ref="textInput"
					className="editing-field"
					/>
				<span className="icon-cancel"
					onClick = { this.deleteHandler }
					></span>
			</div>
		)
	}

	endHandler = (ev) => {
		if( ev.key && ev.key !== 'Enter' ) return;

		this.setState({
			editing:false
		})

		const {
			dispatch,index
		} = this.props;

		dispatch({
			type:'UPDATE_TODO',
			payload:{
				index,
				value:this.state.text
			}
		})
	}

	changeHandler = (ev) => {
		this.setState({
			text:ev.target.value
		})
	}

	checkHandler = () => {
		const {
			dispatch,index
		} = this.props;

		dispatch({
			type:'GET_TODO_DONE',
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
			type:'DELETE_TODO',
			payload:{
				index
			}
		})
	}

	modify = () => {
		this.setState({
			editing:true
		})
	}
}

export default connect()(TodoTaskItem);