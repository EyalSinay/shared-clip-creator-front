import './CreateNew.css';
import React, { useState } from 'react';
import MessageScreen from '../global-components/MessageScreen';
import Loading from '../global-components/Loading';
import createNewProject from '../../utils/createNewProject.js'

function CreateNew() {
    const [loading, setLoading] = useState(false)
    const [createMode, setCreateMode] = useState(false);
    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);
    const [projectName, setProjectName] = useState("");

    const onCreateClick = () => {
        setCreateMode(true)
        setStep1(true)
    }
    const onBackgroundMessageClick = () => {
        if (step1) {
            onCancel1Click();
        }
        if (step2) {
            onCancel2Click();
        }
    }

    const onNext1Click = async () => {
        setLoading(true);
        const token = localStorage.getItem("TOKEN")
        if (token) {
            try {
                const data = await createNewProject(token, projectName);
                if (data !== undefined) {
                    setStep1(false);
                    setStep2(true);
                }
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        }
        setLoading(false);
    }

    const onCancel1Click = () => {
        setStep1(false);
        setCreateMode(false);
    }


    const onNext2Click = () => {
        //! upload file
        //! navigate to project
    }

    const onCancel2Click = () => {
        //! delete request project
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
                            <input type="text" name="projectName" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                            <button className='simple-btn create-btn__next1' onClick={onNext1Click}>Next</button>
                            <button className='simple-btn create-btn__cancel1' onClick={onCancel1Click}>Cancel</button>
                        </div>}
                    {step2
                        &&
                        <div className="project-name">
                            <h2>Upload a mp3 file:</h2>
                            <input type="file" name="" id="" />
                            <button className='simple-btn create-btn__next2' onClick={onNext2Click}>Create</button>
                            <button className='simple-btn create-btn__cancel2' onClick={onCancel2Click}>Cancel</button>
                        </div>}
                </Loading>
            </MessageScreen>
        </>
    )
}

export default CreateNew