import React, { Component } from 'react';
import './App.css';

import Axios from 'axios';

import Insert from '../components/Todos/Todo/Insert';
import Todos from '../components/Todos/Todos';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';



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
    isSigningIn: false,
    isLoggingIn : false,
    signInModalReset : true
  }

  componentDidMount(){
    let token = this.getToken();
    if(token == null){
      return;
    }
    
    this.setState({authenticated: true});
  
    Axios.get('/todos', { headers: {
      //Get user tokens
      'x-auth' : token
      }}).then((response) => {
        this.setState( {todos: response.data.todos} );
      })
      .catch((error) => {
        console.log(error);
      });
    }
  
getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem('_token');
}

getID = () => {
  return localStorage.getItem('_id');
}

logout = () => {
  // Retrieves the user token from localStorage
   localStorage.removeItem('_token');
   this.setState({authenticated: false, todos: []});

   //Upon logging out a call to /user/me/token needs to be called
   //to remove existing token in db.
  
}

   insertTodoHandler = (e) => {
    //Only add new todos when enter is pressed
    if(e.key === "Enter"){
      var textbox = e.target;
      /* 
        In React events are wrapped by a SyntheticEvent. SE's are pooled
        meaning they are being constantly reused after the event callback
        finishes. Thus, events can't be accessed aysnc. 
        To prevent this, use persist() which removes the event from the pool
        and allows event to be referenced by user .
      */
      e.persist();
      
      const text = textbox.value.trim();
      
      if(text.length === 0){
        return;
      }

     /* Careful adding data and header information in the same object
        the header information doesn't actually get passed in the header
        but as a header object int the body.
        Althought if all your sending is a header, like done up above, you can
        place the header just after the endpoint.
     */
      Axios.post('/todos',
        { 
          'text': text,
          '_creator': this.getID()
        }, {headers: {
          'x-auth' : this.getToken()
        }})
        .then(response => {
              const id = response.data._id;
              //Get copy of array
              let todos = [...this.state.todos];
              //Add new Todo to the array
              todos.push({_id: id, text: text});
              //Clear text from texbox
              textbox.value = "";
              this.setState( {todos: todos} );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  deleteTodoHandler = (index, id) => {
    //Get copy of Todos
    let todos = [...this.state.todos];
   
    //Use splice to remove the todo at given index
    todos.splice(index, 1);

    Axios.delete('/todos/' + id,
     {headers : {
      'x-auth' : this.getToken()
        }
    })
      .then(response =>{
        if(response != null){
            //Possibly return ID deleted?
        }
      })
      .catch( error => {
        console.log(error.response);
      });

    //Update state
    this.setState( {todos: todos} );
  }


  loginHandler = () => {
    
    this.setState((prevState, props) => {
      return {
        isLoggingIn: true, 
        isSigningIn: false
      };
    });
  }

  signUpHandler = () =>{
    this.setState({isSigningIn: true, isLoggingIn: false});
  }

  exitModalHandler = () => {
    this.setState({isSigningIn: false, isLoggingIn: false});
    console.log("CHECK");
  }

  render() {
    console.log(this.state.isLoggingIn);
    let todos = null;

  //Conditionally render when User us authorized.
  const isLoggedIn = this.state.authenticated ? <p className="text-center"> Welcome {this.state.user.email} <a href="#"  role="button" onClick={this.logout}> Log out </a> </p> : <p className="text-center"> <a href="#" onClick={this.loginHandler}> Log in </a> to save your todos! </p>;
  
    todos = (
      <div>
       		<Todos  todos={this.state.todos} 
                  handler={this.deleteTodoHandler}
          />
      </div>
      );

    return (
      <div>
        <SignUp isFocused = {this.state.isSigningIn} loginHandler = {this.loginHandler}  exitHandler = {() => this.exitModalHandler()} />
        <Login isFocused = {this.state.isLoggingIn} signUpHandler = {this.signUpHandler} />
        <Header />
        <Insert handler={this.insertTodoHandler }  />
        {isLoggedIn}
        {todos}
        
      </div>
    );
  }
}

export default App;
