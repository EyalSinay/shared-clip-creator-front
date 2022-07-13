import './CreateNew.css';
import React, { useState } from 'react';
import MessageScreen from '../global-components/MessageScreen';
import Loading from '../global-components/Loading';
import createNewProject from '../../utils/createNewProject.js';
import deleteProject from '../../utils/deleteProject.js';
import uploadAudioTrack from '../../utils/uploadAudioTrack.js';
import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function CreateNew() {
    const { token, projects, setProjects } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [createMode, setCreateMode] = useState(false);
    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);
    const [projectData, setProjectData] = useState({})
    const [projectName, setProjectName] = useState("");
    const [projectId, setProjectId] = useState("");
    const [audioTrack, setAudioTrack] = useState(null);
    const projectNameRef = useRef(null)
    const projectFileRef = useRef(null)
    const navigate = useNavigate();

    const getCostumeValidate = () => {
        projectNameRef.current.setCustomValidity('');
        if (projects.some(project => project.projectName === projectName)) {
            projectNameRef.current.setCustomValidity("Project name must be unique")
        }
    }

    const onCreateClick = () => {
        setCreateMode(true)
        setStep1(true)
    }
    const onBackgroundMessageClick = () => {
        if (!loading) {
            if (step1) {
                onCancel1Click();
            }
            if (step2) {
                onCancel2Click();
            }
        }
    }

    const onNext1Click = async () => {
        getCostumeValidate();
        if (projectNameRef.current.reportValidity()) {
            setLoading(true);
            const theToken = token || localStorage.getItem("TOKEN");
            if (theToken) {
                try {
                    const data = await createNewProject(theToken, projectName);
                    const newProjects = [...projects];
                    newProjects.push(data);
                    setProjects(newProjects);
                    if (data) {
                        setStep1(false);
                        setStep2(true);
                    }
                    setProjectData(data);
                    setProjectId(data._id);
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error('no token')
            }
            setLoading(false);
        }
    }

    const onCancel1Click = () => {
        setStep1(false);
        setCreateMode(false);
    }


    const onNext2Click = async () => {
        if (projectFileRef.current.reportValidity()) {
            setLoading(true);
            if (audioTrack) {
                const fd = new FormData();
                fd.append("audioTrack", audioTrack, audioTrack.name);
                const theToken = token || localStorage.getItem("TOKEN");
                if (theToken) {
                    try {
                        await uploadAudioTrack(theToken, projectId, fd);
                        // ! show onUploadProgress
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
            setLoading(false);
            navigate('/project/' + projectId, { state: { projectData, audioTrack } });
        }
    }

    const onCancel2Click = async () => {
        setLoading(true);
        const theToken = token || localStorage.getItem("TOKEN");
        if (theToken) {
            try {
                await deleteProject(theToken, projectId);
                const newProjects = projects.filter(project => project._id !== projectId);
                setProjects(newProjects);
                setProjectId("");
            } catch (err) {
                console.error(err);
            }
        } else {
            console.error('no token')
        }
        setLoading(false);
        setStep2(false);
        setCreateMode(false);
    }


    return (
        <>
            <button className='simple-btn' onClick={onCreateClick}>Create a new clip</button>
            <MessageScreen screenShow={createMode} turnOff={onBackgroundMessageClick}>
                <Loading loading={loading}>
                    {step1
                        &&
                        <div className="project-name">
                            <h2>Project Name:</h2>
                            <input ref={projectNameRef} type="text" name="projectName" id="projectName" required value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                            <button className='simple-btn create-btn__next1' onClick={onNext1Click}>Next</button>
                            <button className='simple-btn create-btn__cancel1' onClick={onCancel1Click}>Cancel</button>
                        </div>}
                    {step2
                        &&
                        <div className="project-name">
                            <h2>Upload a mp3 file:</h2>
                            <input ref={projectFileRef} type="file" name="audioTrack" id="audioTrack" accept='audio/mp3' required onChange={(e) => setAudioTrack(e.target.files[0])} />
                            <button className='simple-btn create-btn__next2' onClick={onNext2Click}>Create</button>
                            <button className='simple-btn create-btn__cancel2' onClick={onCancel2Click}>Cancel</button>
                        </div>}
                </Loading>
            </MessageScreen>
        </>
    )
}

export default CreateNew