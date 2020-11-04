import React from 'react';

const Select = ({title, value, changeHandler, options, on, toggle}) => {
    return ( 
        <div>
            <p>{title}</p>
            <select 
                value={value} 
                onChange={changeHandler} 
            >
                {options}
            </select> 
            <br/>
            <div className="radio">
                <label>
                <input type="radio" onClick={toggle} checked={on} />
                    {on ? "On" : "Off"}
                </label>
            </div>
        </div>
    );
}
 
export default Select;