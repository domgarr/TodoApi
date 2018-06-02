import React, { Component } from 'react';
import './App.css';

import Axios from 'axios';

import Insert from '../components/Todos/Todo/Insert';
import Todos from '../components/Todos/Todos';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';


class App extends Component {
  constructor(props){
    super(props);

    //https://reactjs.org/docs/refs-and-the-dom.html
    //Provides a way to acces React elements created in render method.
    this.loginHandler = this.loginHandler.bind(this) // << important line

  }
  
  state = {
    todos : [],
    authenticated: false,
    user: {},
    isLoggingIn : true,
    
  }

  componentDidMount(){
    Axios.post('/users/login', {email: 'dom@gmal.com', password: 'okay12'} )
      .then((response) => {
        if(response != null){
          console.log(response.data);
          this.setState({authenticated: false, user: response.data});
        } 
      })
      .catch((error) => {
        console.log(error);
      });

      Axios.get('/todos', { headers: {
        //Get user tokens
        //add e in front
        'x-auth' : this.getToken()
      }}).then((response) => {
        console.log(response.data.todos);
        this.setState( {todos: response.data.todos} );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
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
     
      Axios.post('http://localhost:3001/',
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

    Axios.delete('http://localhost:/domenic/todos', {params: {id: todoId + ""} } )
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

  logoutHandler = () => {

  }

  loginHandler = () => {
    
    this.setState((prevState, props) => {
      return {
        isLoggingIn: true
      };
    });

  }


  render() {
    let todos = null;

  //Conditionally render when User us authorized.
  const isLoggedIn = this.state.authenticated ? <p className="text-center"> Welcome {this.state.user.email} <a href="#"> Log out </a> </p> : <p className="text-center"> <a href="#" onClick={this.loginHandler}> Log in </a> to save your todos! </p>;
  
    todos = (
      <div>
       		<Todos  todos={this.state.todos} 
                  handler={this.deleteTodoHandler}
          />
      </div>
      );

  

    

    return (
      <div>
        <Login isFocused = {this.state.isLoggingIn}/>
        <Header />
        <Insert handler={this.insertTodoHandler } />
        {isLoggedIn}
        {todos}
        
      </div>
    );
  }
}

export default App;
