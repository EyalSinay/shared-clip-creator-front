import React from 'react';
import { useNavigate } from 'react-router-dom';

function ParticipantNavigate({ participant }) {
    const navigate = useNavigate();
    return (
        <div className='participant-container'>
            {participant.map(par => <button className='simple-btn' key={par._id} onClick={() => navigate(par.link)}>{`${par.projectName} by ${par.projectOwnerName}`}</button>)}
        </div>
    )
}

export default ParticipantNavigate