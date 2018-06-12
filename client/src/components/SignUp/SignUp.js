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
                  required: true,
                  errorMessage : ""
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
                value: '',
                validation : {
                    required: true,
                    minLength : 7,
                    errorMessage : ""
                   
                }
              }  
        },
        isFocused : false
    }

    clearErrorMessage = () => {
        let signUpForm = this.state.signUpForm;
        for(let key in signUpForm){
           let formElement = signUpForm[key];
           formElement.validation.errorMessage="";
           signUpForm[key] = formElement;
        }
    
        this.setState({signUpForm: signUpForm});
        this.props.exitHandler();

    }

    checkValidity(value, rules, key){
        let isValid = true;
        let errorMessage ="";
        let signUpFormCopy = {...this.state.signUpForm};  
        let validationCopy = signUpFormCopy[key].validation;
        

        if(rules.required){
          isValid = value.trim() !== '';
          if(!isValid){
            errorMessage = errorMessage.concat( key[0].toUpperCase() + key.substring(1, key.length) + " can not be empty\n");
          }
        }
        if(rules.minLength){
          isValid = value.length >= rules.minLength;
          if(!isValid){
            errorMessage = errorMessage.concat( "Password length must be greater than 7\n");
          }
        }
        
        validationCopy.errorMessage = errorMessage;
        signUpFormCopy[key] = validationCopy;
        signUpFormCopy[key].valid = isValid;
        this.setState({ signUpForm: signUpFormCopy});
        
        return isValid;
      }

    inputChangedHandler = (event, id) => {
        const updatedForm = {...this.state.signUpForm};
        //Spread operator only goes one level deep.
        const updatedFormElement = {...updatedForm[id]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, id)
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
        let errorMessage = "";
        
        //Does the information about the form need to be in state?

        for(let key in this.state.signUpForm){
            signUpFormElementsArray.push({
                id: key,
                config: this.state.signUpForm[key]
            });

            if(this.state.signUpForm[key].validation.errorMessage !== ''){
                errorMessage = errorMessage.concat( this.state.signUpForm[key].validation.errorMessage );
            }
        }

        //Allows for '\n' in a div to work as it would in the console.
        let errorStyle = {
            'white-space': 'pre'
        };
        
        let error;
        if(errorMessage !== ''){
            error = (
                <div style={errorStyle} className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            );
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
                {error}
            </div>
        );

        let signUpModal = (
            <Modal isFocused={this.props.isFocused} exitHandler = {this.clearErrorMessage}>
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