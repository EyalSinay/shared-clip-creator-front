import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import MessageScreen from '../global-components/MessageScreen';
import ContactDetails from './ContactDetails';

function SectionsEditMode({
    section,
    duration,
    onEditMarker,
    getValidDecrement,
    getValidIncrement,
    onDeleteClick,
    editProjectMode,
    onSaveParticipantDetailsClick
}) {
    const [inputSecond, setInputSecond] = useState("");
    const inputSecondElement = useRef(null);
    const [contactDetailsOpen, setContactDetailsOpen] = useState(false);

    useEffect(() => {
        setInputSecond(section.secondStart);
        // eslint-disable-next-line
    }, [section.editMode]);

    const handleEditMarker = (editedKey, value, inputElement) => {
        onEditMarker(section.id, editedKey, value, inputElement);
    }

    const onConcatDetailsSaveClick = ({ emailContact, mobileContact, volumeParticipant, secure, varsContact }) => {
        const newObj = {
            targetEmail: emailContact,
            targetPhon: mobileContact,
            volumeVideoTrack: volumeParticipant,
            secure: secure,
            vars: varsContact
        }
        console.log("hi ani secure", secure);
        onSaveParticipantDetailsClick(newObj, section.id);
        // setContactDetailsOpen(false);
    }

    const onIncrementClick = () => {
        const validValue = getValidIncrement(section.secondStart);
        setInputSecond(validValue);
        onEditMarker(section.id, "secondStart", validValue);
    }

    const onDecrementClick = () => {
        const validValue = getValidDecrement(section.secondStart);
        setInputSecond(validValue);
        onEditMarker(section.id, "secondStart", validValue);
    }

    const onCopyLinkClick = () => {
        navigator.clipboard.writeText(section.fullLink);
    }

    return (
        <div className='section-container'>
            <div className='label-name-container'>
                {/* <label htmlFor="label-name">participant: </label> */}
                {
                    section.editMode
                        ?
                        <input type="text" name="label-name" id="label-name" required value={section.name} onChange={e => handleEditMarker("name", e.target.value, e.target)} />
                        :
                        <span>{section.name}</span>
                }
            </div>
            {
                !editProjectMode
                &&
                <div onClick={() => setContactDetailsOpen(true)} className='contact-participant hover-opacity' />
                }
            <MessageScreen screenShow={contactDetailsOpen} turnOff={() => setContactDetailsOpen(false)} >
                <ContactDetails
                    section={section}
                    onSaveClick={onConcatDetailsSaveClick}
                    onCancelClick={() => setContactDetailsOpen(false)}
                />
            </MessageScreen>
            <div className='label-sec-container'>
                <label htmlFor="label-sec">time: </label>
                {
                    section.editMode
                        &&
                        section.secondStart !== 0
                        ?
                        <>
                            <input type="number" name="label-sec" id="label-sec" ref={inputSecondElement} min={0} max={duration - 3} step={0.1} value={inputSecond} onChange={e => setInputSecond(parseFloat(e.target.value))} />
                            <button onClick={() => handleEditMarker("secondStart", inputSecond, inputSecondElement.current)} >HEZ</button>
                            <span>{section.secondStart}</span>
                            <button onClick={onDecrementClick} >-</button>
                            <button onClick={onIncrementClick} >+</button>
                        </>
                        :
                        <span>{`${section.secondStart} - ${section.secondEnd}`}</span>
                }
            </div>
            {
                editProjectMode
                    ?
                    <div className="edit-delete-container">
                        <button onClick={() => handleEditMarker("editMode", !section.editMode)} >{section.editMode ? "finish" : "edit"}</button>
                        {section.secondStart !== 0 && <button onClick={() => onDeleteClick(section.id)}>delete</button>}
                    </div>
                    :
                    <button onClick={onCopyLinkClick} >Copy link</button>
            }
        </div>
    )
}

export default SectionsEditMode