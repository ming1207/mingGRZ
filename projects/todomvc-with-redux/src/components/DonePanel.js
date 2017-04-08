import React,{ Component } from 'react';
import '../styles/panel.css'
import { connect } from 'react-redux';

import DoneTaskItem from './DoneTaskItem';

class Panel extends Component{
	render(){
		return (
			<div className="panel">
				<span className="icon-clock">已完成</span>
				<div className="items-wrapper">
					{ this.getDoneItems() }
				</div>
			</div>
		)
	}

	getDoneItems = () => {
		if( !this.props.dones.length ){
			return <span className="info">无已完成项</span>;
		}

		return this.props.dones.map((text,index) => {
			return (
				<DoneTaskItem 
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
		dones:store.dones
	}
})(Panel);


