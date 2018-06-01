import React, {Component} from 'react';
import './Modal.css';

class Modal extends Component {
    constructor(props){
        super(props);
        this.state = { isFocused: props.isFocused };
    }

    componentWillReceiveProps(nextProps){
        this.setState({isFocused: nextProps.isFocused});
    }
  
    unfocusModal = (event) =>{
    
        const id = event.target.id;
    
        console.log(id);
        switch(id){
        case 'modal-backdrop': this.setState({isFocused: false});
            return;
        case 'modal-exit': this.setState({isFocused: false});
            return;
        default:
            return; 
        }    
    } 

    render() {
        let modal;
        
        if(this.state.isFocused){
            modal = (
            <div id="modal-backdrop" className="modal-backdrop" onClick={this.unfocusModal}>
                <div id="modal-content" className = "modal-content" >
                    <div id="modal-exit" className="modal-exit">&times;</div>
                    {this.props.children}
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
}

export default Modal;