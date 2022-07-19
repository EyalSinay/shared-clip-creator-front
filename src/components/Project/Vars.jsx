import React, { useState } from 'react'
import { useEffect } from 'react';

function Vars({varKey, varValue, onVarChange, onVarDelete}) {
    const [value, setValue] = useState(varValue);

    useEffect(() => {
        onVarChange(varKey, value);
        // eslint-disable-next-line
    },[value]);

    return (
        <div className='vars-main-contact'>
            <div className='vars-contact-input-container contact-input-container'>
                <label className='contact-label key-label' htmlFor="key-contact" >KEY</label>
                <span>{varKey}</span>
                <label className='contact-label value-label' htmlFor="value-contact" >VALUE</label>
                <input className='input-contact' type="text" name="value-contact" id="value-contact"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />
            </div>
            <button onClick={() => onVarDelete(varKey)}>DELETE VARIABLE</button>
        </div>
    )
}

export default Vars