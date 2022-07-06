import React from 'react'
import { useNavigate } from 'react-router-dom';
import SignOut from '../Sign/SignOut';
import SignOutAll from '../Sign/SignOutAll';

function UserConnect({user}) {
    const navigate = useNavigate();

    return (
        <>
            <h2>{`Hello ${user.name}!`}</h2>
            <button onClick={() => navigate('/my-projects')}>To my projects</button>
            <div>
                <SignOut />
            </div>
            <div>
                <SignOutAll />
            </div>
        </>
    )
}

export default UserConnect