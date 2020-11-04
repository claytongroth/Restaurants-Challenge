import React from 'react';

const Select = ({title, value, changeHandler, options}) => {
    return ( 
        <div>
            <p>{title}</p>
            <select 
                value={value} 
                onChange={changeHandler} 
            >
                {options}
            </select> 
        </div>
    );
}
 
export default Select;