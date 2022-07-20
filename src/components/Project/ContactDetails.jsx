import './ContactDetails.css'
import React from 'react'
import { useState } from 'react'
import Vars from './Vars';
import { useEffect } from 'react';
import { useRef } from 'react';
import AddNewVar from './AddNewVar';

function ContactMessage({ section, onSaveClick, onCancelClick }) {
    const [emailContact, setEmailContact] = useState(section.targetEmail);
    const [mobileContact, setMobileContact] = useState(section.targetPhon);
    const [volumeParticipant, setVolumeParticipant] = useState(section.volumeVideoTrack);

    const [varsContact, setVarsContact] = useState([]);
    const [addNewVarMode, setAddNewVarMode] = useState(false)

    const emailContactRef = useRef(null);
    const mobileContactRef = useRef(null);
    const volumeParticipantRef = useRef(null);


    useEffect(() => {
        if (section.vars.length > 0) {
            setVarsContact(section.vars)
        }
    }, [section.vars])

    const onSaveParticipantOptions = () => {
        if (
            emailContactRef.current.reportValidity()
            &&
            mobileContactRef.current.reportValidity()
            &&
            volumeParticipantRef.current.reportValidity()
        ) {
            onCancelClick();
            onSaveClick(varsContact);
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
            <h3 className='title vars-contact-title center-text' style={{ marginTop: 240 }}>Contact options</h3>
            <div className='contact-message-container' >
                <div className='volume-contact-input-container contact-input-container'>
                    <label className='contact-label volume-label'
                        htmlFor="volume-contact" >
                        volume: {volumeParticipant}
                    </label>
                    <input className='input-contact' type="range" name="volume-contact" id="volume-contact"
                        ref={volumeParticipantRef}
                        value={volumeParticipant}
                        onChange={(e) => setVolumeParticipant(e.target.value)} />
                </div>
                <div className='email-contact-input-container contact-input-container'>
                    <label className='contact-label contact-label-icon email-label' htmlFor="email-contact" />
                    <input className='input-contact' type="email" name="email-contact" id="email-contact"
                        ref={emailContactRef}
                        value={emailContact}
                        onChange={(e) => setEmailContact(e.target.value)} />
                </div>
                <div className='mobile-contact-input-container contact-input-container'>
                    <label className='contact-label contact-label-icon mobile-label' htmlFor="mobile-contact" />
                    <input className='input-contact' type="phone" name="mobile-contact" id="mobile-contact"
                        ref={mobileContactRef}
                        value={mobileContact}
                        onChange={(e) => setMobileContact(e.target.value)} />
                </div>
                <h4 style={{ borderTop: "1px solid black" }} className='title vars-contact-title center-text'>Variables</h4>
                {varsContact.map(variable => <Vars
                    key={section.id + variable.key}
                    varKey={variable.key}
                    varValue={variable.value}
                    onVarChange={onVarChange}
                    onVarDelete={onVarDelete}
                />
                )}

            </div>
            <button onClick={() => setAddNewVarMode(pre => !pre)} >{addNewVarMode ? "X" : "+ Add a new variable"}</button>
            {
                addNewVarMode
                &&
                <AddNewVar varsContact={varsContact} setVarsContact={setVarsContact} />
            }
            <div style={{ borderTop: "1px solid black" }} className="save-cancel-container">
                <button onClick={onSaveParticipantOptions} >save</button>
                <button onClick={() => onCancelClick()} >cancel</button>
            </div>
        </div>
    )
}

export default ContactMessage