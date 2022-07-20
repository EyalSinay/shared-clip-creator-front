import noSignalGif from '../../assets/gifs/no-signal.gif';
import React, { useRef } from 'react';
import { useState } from 'react';
import MessageScreen from '../global-components/MessageScreen';

function ProjectOptions({ onCancelClick, project, onSaveProjectOptionsClick, onDeleteProjectApproved }) {
    const [projectName, setProjectName] = useState("");
    const [scaleVideo, setScaleVideo] = useState("");
    const [volumeAudioTrack, setVolumeAudioTrack] = useState(1);
    const [projectAllowed, setProjectAllowed] = useState(false);
    const [preDeleteWarning, setPreDeleteWarning] = useState(false);
    const projectNameRef = useRef(null);
    const scaleVideoRef = useRef(null);
    const volumeAudioTrackRef = useRef(null);
    const projectAllowedRef = useRef(null);

    useState(() => {
        if (Object.keys(project).length > 0) {
            setProjectName(project.projectName);
            setScaleVideo(project.scaleVideo);
            setProjectAllowed(project.allowed);
            setVolumeAudioTrack(project.volumeAudioTrack);
        }
    }, [project]);

    const onSaveClick = () => {
        if (
            projectNameRef.current.checkValidity()
            &&
            scaleVideoRef.current.checkValidity()
            &&
            projectAllowedRef.current.checkValidity()
            &&
            volumeAudioTrackRef.current.checkValidity()
        ) {
            onSaveProjectOptionsClick(projectName, scaleVideo, projectAllowed, volumeAudioTrack);
        }
    }

    const getScaleDimensions = (dim) => {
        const splitScale = scaleVideo.split('x').map(el => parseInt(el) / 10);
        switch (dim) {
            case 'width':
                return splitScale[0]
            case 'height':
                return splitScale[1]
            default:
                return `"${dim}" is not valid value`
        }
    }

    const scaleVisualStyle = {
        width: getScaleDimensions('width'),
        height: getScaleDimensions('height'),
        backgroundImage: `url(${noSignalGif})`,
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: 4,
        border: "2px solid black",
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const innerScaleVisualStyle = {
        background: "black",
        color: "white",
        fontSize: 16,
        padding: 4,
        borderRadius: 8
    }

    return (
        <div className="project-property-container">
            <div className="project-name-container">
                <label htmlFor="project-name">Project name</label>
                <input ref={projectNameRef} type="text" name="project-name" id="project-name" required
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
            </div>
            <div className="project-scale-video-container">
                <label htmlFor="project-scale-video">Project scale video</label>
                <select ref={scaleVideoRef} name="project-scale-video" id="project-scale-video"
                    value={scaleVideo}
                    onChange={(e) => setScaleVideo(e.target.value)}
                >
                    <option value="1920x1080">1920x1080</option>
                    <option value="1080x1920">1080x1920</option>
                </select>
                <div style={scaleVisualStyle}>
                    <div style={innerScaleVisualStyle}>
                        {scaleVideo}
                    </div>
                </div>
            </div>
            <div className="volume-audio-container">
                <input name="volume-audio" id="volume-audio" ref={volumeAudioTrackRef}
                    type='range'
                    min='0'
                    max='1'
                    step='0.01'
                    value={volumeAudioTrack}
                    onChange={e => setVolumeAudioTrack(e.target.value)}
                    className='slider volume-slider'
                />
                <span>{Math.round(volumeAudioTrack * 100)}</span>
            </div>
            <div className="project-paying-container">
                <label htmlFor="paying">pay 💰</label>
                <input ref={projectAllowedRef} type="checkbox" name="paying" id="paying"
                    value={projectAllowed}
                    onChange={(e) => setProjectAllowed(e.target.checked)}
                />
            </div>
            <div className="delete-project-container">
                <button
                    className='delete-btn'
                    onClick={() => setPreDeleteWarning(true)} >
                    DELETE PROJECT
                </button>
                <MessageScreen screenShow={preDeleteWarning} turnOff={() => setPreDeleteWarning(false)} >
                    <h2>DELETE???</h2>
                    <button onClick={() => onDeleteProjectApproved()} >DELETE PROJECT</button>
                    <button onClick={() => setPreDeleteWarning(false)} >Cancel</button>
                </MessageScreen>
            </div>
            <button onClick={() => onSaveClick()} >Save</button>
            <button onClick={() => onCancelClick(false)} >Cancel</button>
        </div>
    )
}

export default ProjectOptions