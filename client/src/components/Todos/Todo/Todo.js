import React from 'react';
import './Todo';
import pic from '../../../assets/icons/fish_eye.svg';

const todo = (props) =>{
	return (
	<div className="row todo animated jackInTheBox">
	
		<div className=" col-md-6 mx-auto mt-2 ml-5 mr-5">		
			<p className="list-group-item text-left lead" onClick={props.click}>  <img src={pic} className="img-fluid" alt="fish eye icon"/>	   {props.action} </p>
		</div>
	</div>
	)
};

export default todo;