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
    }

    return (
        <div>
        {inputElement} 
        </div>
        );
}

export default input;