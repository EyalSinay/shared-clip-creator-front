import React, { useRef, useState } from 'react'

function AddNewVar({varsContact, setVarsContact, setAddNewVarMode}) {
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    const newKeyRef = useRef(null);
    const newValueRef = useRef(null);

    const onAddVarClick = () => {
        newKeyRef.current.setCustomValidity('');
        if (varsContact.some(variable => variable.key === newKey)) {
            newKeyRef.current.setCustomValidity('key must to be unique');
        }
        if(newKey === "NAME"){
            newKeyRef.current.setCustomValidity('NAME is a key that in use by default');
        }
        if(newKey === "LINK"){
            newKeyRef.current.setCustomValidity('LINK is a key that in use by default');
        }

        if (newKeyRef.current.reportValidity() && newValueRef.current.reportValidity()) {
            const newVarsArr = [...varsContact, { key: newKey, value: newValue }];
            setVarsContact(newVarsArr);
            setNewKey("");
            setNewValue("");
            setAddNewVarMode(false);
        }
    }

    return (
        <div className='new-var-contact-input-container'>
            <div className='new-key-contact-input-container contact-input-container'>
                <label className='contact-label new-key-label' htmlFor="new-key-contact" >KEY</label>
                <input ref={newKeyRef} required className='input-contact' type="text" name="new-key-contact" id="new-key-contact"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value.toUpperCase())} />
            </div>
            <div className='new-value-contact-input-container contact-input-container'>
                <label className='contact-label new-value-label' htmlFor="new-value-contact" >VALUE</label>
                <input ref={newValueRef} required className='input-contact' type="text" name="new-value-contact" id="new-value-contact"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)} />
            </div>
            <button onClick={onAddVarClick} >add variable</button>
        </div>
    )
}

export default AddNewVar