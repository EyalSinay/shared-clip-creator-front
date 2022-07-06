import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserDisConnect() {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <button onClick={() => navigate('/sign-in')}>Sign In</button>
            </div>
            <div>
                <button onClick={() => navigate('/sign-up')}>Sign Up</button>
            </div>
        </>
    )
}

export default UserDisConnect