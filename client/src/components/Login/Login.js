import React from 'react';
import Modal from '../../containers/Modal/Modal';
import './Login.css';

const login = (props) => {
    var loginModal;

         loginModal = (
            <Modal isFocused={ props.isFocused}> 
                <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
                <input type="email" id='inputEmail' className="form-control margin-10" placeholder="garreffd@uwindsor.ca" required autoFocus />
                <input type="password" id="inputPassword" className="form-control margin-10" placeholder="Password" required />
                <button className="btn btn-block  btn-primary " type="submit">Sign in</button>
                <p className="margin-10"> Don't have an account? <a href="" > sign up </a> </p>
            </Modal>
        );
    
    return (
        <div>
        {loginModal}
        </div>
    )
};

export default login;
