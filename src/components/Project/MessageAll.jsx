import './MessageAll.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import updateProject from '../../utils/updateProject';
import { useRef } from 'react';
import MessageScreen from '../global-components/MessageScreen';
import SendMessageAllScreen from './SendMessageAllScreen'

function MessageAll({ project, token, setProject }) {
    const [message, setMessage] = useState("");
    const [keysArr, setKeysArr] = useState(["NAME", "LINK"]);
    const [paragraphsArr, setParagraphsArr] = useState([])
    const [firstUserType, setFirstUserType] = useState(false);
    const messageRef = useRef(null);
    const [emailScreenOn, setEmailScreenOn] = useState(false);
    const [whatsAppScreenOn, setWhatsAppScreenOn] = useState(false);

    useEffect(() => {
        if (project.varsKeys !== undefined) {
            setKeysArr(["NAME", "LINK", ...project.varsKeys]);
        }
    }, [project.varsKeys]);

    useEffect(() => {
        if (project.message !== undefined && project.message !== message) {
            setMessage(project.message);
        }
        // eslint-disable-next-line
    }, [project.message])

    useEffect(() => {
        if (firstUserType) {
            const delay = setTimeout(() => {
                updateProject(token, project._id, { message })
                    .then(data => { setProject(data) });
            }, 3000);
            return () => clearTimeout(delay);
        }
        // eslint-disable-next-line
    }, [message]);

    useEffect(() => {
        if (messageRef) {
            setParagraphsArr(messageRef.current.innerHTML.split('\n'));
        }
    }, [message]);

    const onMessageChange = (e) => {
        setFirstUserType(true);
        setMessage(e.target.value)
    }

    const onVarClick = (e) => {
        const newStr = message + "▷" + e.target.value + "◁";
        setMessage(newStr);
        messageRef.current.focus();
    }



    return (
        <section className="message-all-container">
            <div className="variables-container">
                <span>Variables: </span>
                {keysArr.map(keyVar => {
                    return (<button
                        key={"variable-key-button-" + keyVar}
                        id={"variable-key-button-" + keyVar}
                        className="message-all-keyVar-btn"
                        value={keyVar}
                        onClick={onVarClick}
                    >
                        {"▷" + keyVar + "◁"}
                    </button>)
                })}
            </div>
            <textarea
                placeholder="Insert your message here...
                This message will be shown to the participants on their page,
                You can also send this message via email or WhatsApp to all participants.
                You can add variables by editing participants' details."
                ref={messageRef}
                id='message-input'
                value={message}
                onChange={onMessageChange}
            ></textarea>
            <div className="send-message-all-btn-container">
                <button onClick={() => setEmailScreenOn(true)} className='send-mail-all-btn send-all-btn' />
                <button onClick={() => setWhatsAppScreenOn(true)} className='send-whatsapp-all-btn send-all-btn' />
                <MessageScreen screenShow={emailScreenOn} turnOff={() => setEmailScreenOn(false)} >
                    <SendMessageAllScreen project={project} paragraphsArr={paragraphsArr} onCancelClick={() => setEmailScreenOn(false)} />
                </MessageScreen>
                <MessageScreen screenShow={whatsAppScreenOn} turnOff={() => setWhatsAppScreenOn(false)} >
                    <h1>This option will be available soon</h1>
                </MessageScreen>
            </div>
        </section>
    )
}

export default MessageAll