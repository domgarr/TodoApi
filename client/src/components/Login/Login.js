import React from 'react';
import './Login.css';

const login = (props) => {
    var loginModal;
    
    if(props.isLogginIn){
         loginModal = (
            <div id="login-modal-backdrop" className="login-modal" onClick={props.unfocusModal}>
            <div id="login-modal-content" className = "login-modal-content" >
                <span id="login-modal-exit" className="close">&times;</span>
                <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                <input type="email" id='inputEmail' className="form-control input-margin" placeholder="garreffd@uwindsor.ca" required autoFocus />
                <input type="password" id="inputPassword" className="form-control input-margin" placeholder="Password" required />
                <button className="btn btn-block  btn-primary " type="submit">Sign in</button>
                <p className="input-margin"> Don't have an account? <a href="" > sign up </a> </p>
            </div>
        </div>
        );
    }
    
    return (
        <div>
        {loginModal}
        </div>
    )
};

export default login;
