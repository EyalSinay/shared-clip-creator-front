import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

function SectionsEditMode({ section, duration, onEditMarker, getValidDecrement, getValidIncrement, onDeleteClick }) {
    const [inputSecond, setInputSecond] = useState("");
    const inputSecondElement = useRef(null);

    useEffect(() => {
        setInputSecond(section.secondStart);
        // eslint-disable-next-line
    },[section.editMode]);

    const handleEditMarker = (editedKey, value, inputElement) => {
        onEditMarker(section.id, editedKey, value, inputElement);
    }

    const onIncrementClick = () => {
        const validValue = getValidIncrement(section.secondStart);
        onEditMarker(section.id, "secondStart", validValue);
    }

    const onDecrementClick = () => {
        const validValue = getValidDecrement(section.secondStart);
        onEditMarker(section.id, "secondStart", validValue);
    }

    return (
        <div className='section-container'>
            <div className='label-name-container'>
                <label htmlFor="label-name">participant: </label>
                {section.editMode ?
                    <input type="text" name="label-name" id="label-name" required value={section.name} onChange={e => handleEditMarker("name", e.target.value, e.target)} />
                    :
                    <span>{section.name}</span>
                }
            </div>
            <div className='label-sec-container'>
                <label htmlFor="label-sec">time: </label>
                {section.editMode && section.secondStart !== 0
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
            {section.secondStart !== 0 && <button onClick={() => onDeleteClick(section.id)}>delete</button>}
            <button onClick={() => handleEditMarker("editMode", !section.editMode)} >{section.editMode ? "finish" : "edit"}</button>
        </div>
    )
}

export default SectionsEditMode