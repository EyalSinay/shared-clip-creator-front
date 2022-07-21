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
    const [secure, setSecure] = useState(section.secure);
    const [varsContact, setVarsContact] = useState([]);

    const [addNewVarMode, setAddNewVarMode] = useState(false);

    const emailContactRef = useRef(null);
    const mobileContactRef = useRef(null);
    const volumeParticipantRef = useRef(null);

    useEffect(() => {
        if (section.vars.length > 0) {
            setVarsContact(section.vars)
        }
    }, [section.vars])

    const validatePhoneNumber = (input_str) => {
        // eslint-disable-next-line
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(input_str);
    }

    const validateEmail = (input_str) => {
        // eslint-disable-next-line
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(input_str);
    }

    const onSaveParticipantOptions = () => {
        mobileContactRef.current.setCustomValidity('');
        if(!validatePhoneNumber(mobileContact) && mobileContact !== ""){
            mobileContactRef.current.setCustomValidity('Please enter a valid phone number');
        }

        emailContactRef.current.setCustomValidity('');
        if(!validateEmail(emailContact) && emailContact !== ""){
            mobileContactRef.current.setCustomValidity('Please enter a valid email address');
        }
        
        if (
            emailContactRef.current.reportValidity()
            &&
            mobileContactRef.current.reportValidity()
            &&
            volumeParticipantRef.current.reportValidity()
        ) {
            onCancelClick();
            onSaveClick({ emailContact, mobileContact, volumeParticipant, secure, varsContact });
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
            <h3 className='title vars-contact-title center-text' style={{ marginTop: 40 }}>Contact options</h3>
            <div className='contact-message-container' >
                <div className='volume-contact-input-container contact-input-container'>
                    <label className='contact-label volume-label'
                        htmlFor="volume-contact" >
                        volume: {Math.round(volumeParticipant * 100)}
                    </label>
                    <input className='input-contact'
                        type="range"
                        name="volume-contact"
                        id="volume-contact"
                        min='0'
                        max='1'
                        step='0.01'
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
                <span style={{color: "red", fontSize: 20}} >Note that if you change the email address, the link will change, and if the participant has already uploaded a file, the file will be deleted.</span>
                <div className='mobile-contact-input-container contact-input-container'>
                    <label className='contact-label contact-label-icon mobile-label' htmlFor="mobile-contact" />
                    <input className='input-contact' type="phone" name="mobile-contact" id="mobile-contact"
                        ref={mobileContactRef}
                        value={mobileContact}
                        onChange={(e) => setMobileContact(e.target.value)} />
                </div>
                <div className='secure-contact-input-container contact-input-container'>
                    <label className='contact-label contact-label-icon secure-label' htmlFor="secure-contact" >
                        Secure
                    </label>
                    <input className='input-contact' type="checkbox" name="secure-contact" id="secure-contact"
                        value={secure}
                        onChange={(e) => setSecure(e.target.checked)} />
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
                <AddNewVar varsContact={varsContact} setVarsContact={setVarsContact} setAddNewVarMode={setAddNewVarMode} />
            }
            <div style={{ borderTop: "1px solid black" }} className="save-cancel-container">
                <button onClick={onSaveParticipantOptions} >save</button>
                <button onClick={() => onCancelClick()} >cancel</button>
            </div>
        </div>
    )
}

export default ContactMessage