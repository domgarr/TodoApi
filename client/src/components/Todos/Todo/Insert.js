import React from 'react';
import './Insert.css'

const insert = (props) =>{
	return(
		<div className="row ml-3 mr-3">
			<input className="form-control form-control-lg col-md-6 text-center mx-auto " 
				type = "text" 
 				placeholder = "Drink an espresso" 
				onKeyPress={ props.handler.bind(this)} 
			/>
		</div>
		)
};

export default insert;