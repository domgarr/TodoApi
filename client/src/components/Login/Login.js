import React, {Component} from 'react';
import Axios from 'axios';

import Modal from '../../containers/Modal/Modal';
import Input from '../UI/Input/Input';

import './Login.css';

class Login extends Component{
    
    state = {
        loginForm: {
            email: {
              elementType: 'input',
              elementConfig: {
                type: 'email',
                className: "form-control margin-10",
                placeholder: "garreffd@uwindsor.ca",
                required: 'required',
                autoFocus: 'autoFocus'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false
              
            },
            password :{
              elementType: 'input',
              elementConfig: {
                type: 'password',
                 className: "form-control margin-10",
                 placeholder: "Password",
                 required: 'required'
              },
              value: ''
            }
          }
    }
    //<input type="email" id='inputEmail' className="form-control margin-10" placeholder="garreffd@uwindsor.ca" required autoFocus />
    //<input type="password" id="inputPassword" className="form-control margin-10" placeholder="Password" required />
        

    checkValidity(value, rules){
        let isValid;
        if(rules.required){
          isValid = value.trim() !== '';
          return false;
        }
      }

      inputChangedHandler = (event, id) => {
        const updatedForm = {...this.state.loginForm }
        //Spread operator only goes one level deep.
        //id is essentially email, password, etc
        const updatedFormElement = {...updatedForm[id]};
        updatedFormElement.value = event.target.value;
        updatedForm[id] = updatedFormElement;

        this.setState({loginForm: updatedForm});
    }

    loginHandler = (event) => {
        event.preventDefault();
        const formData = {
            email: this.state.loginForm.email.value, 
            password: this.state.loginForm.password.value
        };
       
        Axios.post('/users/login', formData)
        .then((res) => {
            this.setToken(res.headers['x-auth']);
            this.setID(res.data._id);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    //Storing of token
    //https://hptechblogs.com/using-json-web-token-react/
    setToken = (_token) => {
        // Saves user token to localStorage
        localStorage.setItem('_token', _token);
    }

    setID = (_id) => {
        localStorage.setItem('_id', _id);
    }

    render(){
        const loginFormElementsArray = [];
  
        for(let key in this.state.loginForm){
          loginFormElementsArray.push({
            id: key,
            config: this.state.loginForm[key]
          });
        }
      
            let form = (
              <div>
                {loginFormElementsArray.map(formElement => (
                  <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
              </div>
            );


        let loginModal = (
            <Modal isFocused={ this.props.isFocused}> 
                <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                <form onSubmit={this.loginHandler}>
                    {form}
                    <button className="btn btn-block  btn-primary " type="submit">Sign in</button>
                </form>
                <p className="margin-10"> Don't have an account? <a href="" > sign up </a> </p>
            </Modal>
        );
    
    return (
        <div>
        {loginModal}
        </div>
    )
    }
};

export default Login;
