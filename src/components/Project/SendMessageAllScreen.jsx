import React from 'react'

function SendMessageAllScreen({ project, paragraphsArr, onCancelClick }) {
    const onSendClick = (e) => {
        e.preventDefault()
        console.log(e);
    }

    return (
        <div className='message-all-main-container'>
            <div className='message-all-context'>
                <h2 className='message-all-title center-text'>{project.projectName}</h2>
                {paragraphsArr.map((paragraph, index) => <p key={`message-all-${index}`} className='message-all__paragraph' >{paragraph}</p>)}
            </div>
            <form onSubmit={onSendClick} className='message-all-mailing-list'>
                {project.sections.map(sec => <div key={`message-all-mailing-list-${sec._id}`}>
                    <input
                        
                        type="checkbox"
                        name={sec.secName}
                        id={`message-all-mailing-list-${sec._id}`}
                    />
                    <label htmlFor={`message-all-mailing-list-${sec._id}`}
                    >
                        {" " + sec.secName}
                    </label>
                </div>)}
                <div className="message-all-send-cancel-container">
                    <button type="submit" >SEND</button>
                    <button onClick={onCancelClick} >CANCEL</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessageAllScreen