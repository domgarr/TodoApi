import React, {Component} from 'react';
import './Modal.css';

 const modal = (props) => {
    const unfocusModal = (event) => {
        const id = event.target.id;
        
        switch(id){
        case 'modal-backdrop': props.exitHandler();
            return;
        case 'modal-exit': props.exitHandler();
            return;
        default:
            return; 
        }    
    } 

    
        let modal;
        if(props.isFocused){
            modal = (
            <div id="modal-backdrop" className="modal-backdrop" onClick={unfocusModal}>
                <div id="modal-content" className = "modal-content" >
                    <div id="modal-exit" className="modal-exit">&times;</div>
                    {props.children}
                </div>
            </div>
            );
        }
   
        return (
            <div>
                {modal}
            </div>
        );
    }


export default modal;