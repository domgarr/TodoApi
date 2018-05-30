import React, { Component } from 'react';
import './App.css';
import Insert from '../components/Todos/Todo/Insert';
import Todos from '../components/Todos/Todos';
import Header from '../components/Header/Header';
import Axios from 'axios';



class App extends Component {
  state = {
    todos : [{id: 0 , action: "this is a todo"}, {id: 1, action: "check"}],
    authorized: false,
  }

  componentDidMount(){
    Axios.get('/login')
      .then((response) => {
        if(response != null){
          console.log(response.data);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  }



   insertTodoHandler = (e) => {
    //Only add new todos when enter is pressed
    if(e.key === "Enter"){
      /* 
        In React events are wrapped by a SyntheticEvent. SE's are pooled
        meaning they are being constantly reused after the event callback
        finishes. Thus, events can't be accessed aysnc. 
        To prevent this, use persist() which removes the event from the pool
        and allows event to be referenced by user .
      */
      e.persist();
      const action = e.target.value;
     
      Axios.post('http://localhost:8080/domenic/todos',
        {
          account: 'domenic',
          action: action
        })
        .then(response => {
          //Location has ID of newly created Todo
            const location = response.headers.location;
            if(location != null){
              const tokens = location.split('/');
              const id = tokens[tokens.length-1];

              //Get copy of array
              let todos = [...this.state.todos];
              //Add new Todo to the array
              todos.push({id: id, action: action});
              //Clear text from texbox
              e.target.value = "";
              //Update state
              this.setState( {todos: todos} );
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteTodoHandler = (index) => {
    //Get copy of Todos
    let todos = [...this.state.todos];
    //Get id of Todo before removing from array.
    const todoId = todos[index].id;
  
    //Use splice to remove the todo at given index
    todos.splice(index, 1);

    Axios.delete('http://localhost:8080/domenic/todos', {params: {id: todoId + ""} } )
      .then(response =>{
        if(response != null){
            console.log(response);
        }
      })
      .catch( error => {
        console.log(error);
      });

    //Update state
    this.setState( {todos: todos} );
  }

 

  render() {
    let todos = null;

    todos = (
      <div>
       		<Todos  todos={this.state.todos} 
                  handler={this.deleteTodoHandler}
          />
      </div>
      );

    //Conditionally render when User us authorized.
    const isLoggedIn = this.state.authorized ? <p> Logged In </p> : <p> <a href="/"> Log in </a> to save your todos! </p>;
      

    return (
      <div className="App">
        <Header />
        <Insert handler={this.insertTodoHandler } />
        {todos}
        {isLoggedIn}
      </div>
    );
  }
}

export default App;
