import React from 'react';

const input = (props) =>{
    let inputElement = null;

    // ... is the spread operator,
    //it will spread out properties in prop as attributes.
    switch(props.elementType){
        case 'input': 
            inputElement = <input {...props.elementConfig}
                onChange={props.changed}
            />
            break;
        default: console.log('Error: input element does not exist');
            return;
    }

    return (
        <div>
        {inputElement} 
        </div>
        );
}

export default input;