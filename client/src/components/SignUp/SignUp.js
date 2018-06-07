import React, {Component} from 'react';
import Modal from '../../containers/Modal/Modal';
import Input from '../UI/Input/Input';
import Axios from 'axios';


class SignUp extends Component {
    state = {
        signUpForm : {
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

    inputChangedHandler = (event, id) => {
        const updatedForm = {...this.state.signUpForm};
        //Spread operator only goes one level deep.
        const updatedFormElement = {...updatedForm[id]};
        updatedFormElement.value = event.target.value;
        updatedForm[id] = updatedFormElement;
        this.setState({signUpForm: updatedForm});
    }

    signUpHandler = () => {
        const formData = {
            email : this.state.signUpForm.email.value,
            password: this.state.signUpForm.password.value
        };
        
        Axios.post('/users', formData)
            .then((res) => {
                console.log("Account successfully created");
            })
            .catch((err) => {
                console.log("Account not created");
            })
    }

    render(){
        const signUpFormElementsArray = [];

        //Does the information about the form need to be in state?

        for(let key in this.state.signUpForm){
            signUpFormElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });
        }

        let form = (
            <div>
            {signUpFormElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))}
            </div>
        );

        let signUpModal = (
            <Modal isFocused={this.props.isFocused}>
                <h1 className = "h3 mb-3 font-weight-normal"> Sign up to save your todo list </h1>
                <form onSubmit={this.signUpHandler}>
                    {form}
                    <button className="btn btn-block btn-success" type="submit" > Sign Up </button>
                </form>  
                <p className = "margin-10"> Already have an account? <a href="#" onClick={this.props.loginHandler} > Sign in </a> </p>
            </Modal>
        );

        return(
            <div>
            {signUpModal}
            </div>
        );
    }
}

export default SignUp;