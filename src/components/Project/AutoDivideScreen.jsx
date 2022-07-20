import React, { useState, useRef } from 'react'
import randomColor from "randomcolor";


function AutoDivideScreen({ project, duration, create, cancel }) {
    const [participantNum, setParticipantNum] = useState(2);
    const inputRef = useRef(null)

    const onCreateAutoDivideClick = () => {
        if (inputRef.current.reportValidity()) {
            const newArr = []
            for (let i = 0; i < participantNum; i++) {
                const color = randomColor({
                    luminosity: "dark",
                    alpha: 0.5,
                    format: "rgba",
                });

                const vars = project.varsKeys.map(variable => ({key: variable, value: ""}));

                const newMarker = {
                    secondStart: Math.round((duration / participantNum) * i * 10) / 10,
                    name: "sec" + (i + 1),
                    projectName: project.projectName,
                    targetEmail: "",
                    targetPhon: "",
                    secure: false,
                    allowedWatch: false,
                    secLink: "",
                    fullLink: "",
                    seenByOwner: true,
                    seenByParticipant: false,
                    volumeVideoTrack: 1,
                    vars,
                    color,
                    editMode: false,
                    id: Date.now() + i
                }
                newArr.push(newMarker);
            }
            create(newArr);
            cancel();
        }
    }

    return (
        <div className='auto-divide-screen'>
            <h2>Auto Divide</h2>
            <h3>Note that when you click 'Create' all existing sections will be deleted</h3>
            <p>How many participants would you like to share?</p>
            <input ref={inputRef} type="number" name="participant" id="participant-auto-divide"
                min={1} max={duration / 3 - (duration % 3 / 3)} value={participantNum} onChange={(e) => setParticipantNum(e.target.value)} />
            <p>Seconds per section: {Math.round((duration / participantNum) * 10) / 10}</p>
            <button onClick={() => onCreateAutoDivideClick()} >Create sections</button>
            <button onClick={cancel} >Cancel</button>
        </div>
    )
}

export default AutoDivideScreen

// argument: secondsArr