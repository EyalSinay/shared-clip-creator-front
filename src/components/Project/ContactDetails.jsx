import './ContactDetails.css'
import React from 'react'
import { useState } from 'react'
import Vars from './Vars';
import { useEffect } from 'react';
import { useRef } from 'react';

function ContactMessage({ section, onSaveClick, onCancelClick }) {
    const [emailContact, setEmailContact] = useState(section.targetEmail);
    const [mobileContact, setMobileContact] = useState(section.targetPhon);
    const [newKey, setNewKey] = useState("");
    const [newValue, setNewValue] = useState("");
    const [varsContact, setVarsContact] = useState([]);

    const newKeyRef = useRef(null)
    const newValueRef = useRef(null)

    useEffect(() => {
        if (section.vars.length > 0) {
            setVarsContact(section.vars)
        }
    }, [section.vars])

    const onAddVarClick = () => {
        newKeyRef.current.setCustomValidity('');
        if(varsContact.some(variable => variable.key === newKey)){
            newKeyRef.current.setCustomValidity('key must to be unique');
        }

        if (newKeyRef.current.reportValidity() && newValueRef.current.reportValidity()) {
            const newVarsArr = [...varsContact, { key: newKey, value: newValue }];
            setVarsContact(newVarsArr);
            setNewKey("");
            setNewValue("");
        }
    }

    const onVarChange = (key, value) => {
        const newVarsArr = [...varsContact];
        const varChange = newVarsArr.find(variable => variable.key === key);
        varChange.value = value;
        setVarsContact(newVarsArr);
    }

    const onVarDelete = (key) => {
        const newVarsArr = [...varsContact];
        const varDeleteIndex = newVarsArr.findIndex(variable => variable.key === key);
        newVarsArr.splice(varDeleteIndex, 1);
        setVarsContact(newVarsArr);
    }

    return (
        <div className="contact-message-main-container">
            <div className='contact-message-container' >
                <div className='email-contact-input-container contact-input-container'>
                    <label className='contact-label email-label' htmlFor="email-contact" />
                    <input className='input-contact' type="email" name="email-contact" id="email-contact"
                        value={emailContact}
                        onChange={(e) => setEmailContact(e.target.value)} />
                </div>
                <div className='mobile-contact-input-container contact-input-container'>
                    <label className='contact-label mobile-label' htmlFor="mobile-contact" />
                    <input className='input-contact' type="phone" name="mobile-contact" id="mobile-contact"
                        value={mobileContact}
                        onChange={(e) => setMobileContact(e.target.value)} />
                </div>
                {varsContact.map(variable => <Vars
                    key={section.id + variable.key}
                    varKey={variable.key}
                    varValue={variable.value}
                    onVarChange={onVarChange}
                    onVarDelete={onVarDelete} />
                )}

            </div>
            <div className='new-var-contact-input-container'>
                <div className='new-key-contact-input-container contact-input-container'>
                    <label className='contact-label new-key-label' htmlFor="new-key-contact" >KEY</label>
                    <input ref={newKeyRef} required className='input-contact' type="text" name="new-key-contact" id="new-key-contact"
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)} />
                </div>
                <div className='new-value-contact-input-container contact-input-container'>
                    <label className='contact-label new-value-label' htmlFor="new-value-contact" >VALUE</label>
                    <input ref={newValueRef} required className='input-contact' type="text" name="new-value-contact" id="new-value-contact"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)} />
                </div>
                <button onClick={onAddVarClick} >add variable</button>
            </div>
            <button onClick={() => {onCancelClick(); onSaveClick(varsContact)}} >save</button>
            <button onClick={() => onCancelClick()} >cancel</button>
        </div>
    )
}

export default ContactMessage