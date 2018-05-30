import React from 'react';
import Todo from './Todo/Todo';

//Can shorten to only return paranthesis, if the aim of this function is to return.
const todos = (props) => (
		 props.todos.map( (todo, index) => {
            return  <	Todo key = {todo.id}
                        	 action = {todo.action}
                        	 click = {() => props.handler(index)} 
                    />
        })	
	);

export default todos;