import React, { useContext } from 'react'
import { useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import MessageScreen from '../global-components/MessageScreen';

function MyAccount() {
    const [buttonClick, setButtonClicked] = useState(false)
    const user = useContext(UserContext);
    return (
        <>
            <button onClick={() => setButtonClicked(true)}>
                My Account
            </button>
            {<MessageScreen screenShow={buttonClick} turnOff={() => setButtonClicked(false)} >
                {JSON.stringify(user)}
            </MessageScreen>}
        </>
    )
}

export default MyAccount