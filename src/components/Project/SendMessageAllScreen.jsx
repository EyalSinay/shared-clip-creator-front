import React from 'react'

function SendMessageAllScreen({ project, paragraphsArr, onCancelClick }) {

    const onSendClick = (e) => {
        e.preventDefault();
        const idsChecked =[];
        const inputsCollection = e.target.elements;
        for (let input of inputsCollection) {
            if(input.checked){
                idsChecked.push(input.value);
            }
          }
          console.log(idsChecked);
    }

    return (
        <div className='message-all-main-container'>
            <div className='message-all-context'>
                <h2 className='message-all-title center-text'>{project.projectName}</h2>
                {paragraphsArr.map((paragraph, index) => <p key={`message-all-${index}`} className='message-all__paragraph' >{paragraph}</p>)}
            </div>
            <form onSubmit={onSendClick} className='message-all-mailing-list'>
                {project.sections.map(sec => {
                    const hasEmailAddress = sec.targetEmail !== "";
                    return (<div key={`message-all-mailing-list-${sec._id}`}>
                        <input
                            disabled={!hasEmailAddress}
                            type="checkbox"
                            name={sec.secName}
                            value={sec._id}
                            id={`message-all-mailing-list-${sec._id}`}
                        />
                        <label htmlFor={`message-all-mailing-list-${sec._id}`}
                        >
                            {" " + sec.secName}
                        </label>
                    </div>)
                }
                )}
                <div className="message-all-send-cancel-container">
                    <button type="submit" >SEND</button>
                    <button onClick={onCancelClick} >CANCEL</button>
                </div>
            </form>
        </div>
    )
}

export default SendMessageAllScreen