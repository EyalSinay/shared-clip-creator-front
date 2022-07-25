import React, { useContext } from 'react'
import { useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import MessageScreen from '../global-components/MessageScreen';
import deleteAccount from '../../utils/deleteAccount';

function MyAccount() {
    const [buttonClick, setButtonClicked] = useState(false)
    const {token} = useContext(UserContext);


    const onDeleteAccountClick = async ()=> {
        const theToken = token || localStorage.getItem("TOKEN");
        await deleteAccount(theToken);
    }

     //! are u shore?! and refresh
    return (
        <>
            <button onClick={() => setButtonClicked(true)}>
                My Account
            </button>
            {<MessageScreen screenShow={buttonClick} turnOff={() => setButtonClicked(false)} >
                <button onClick={onDeleteAccountClick} >DELETE account</button>
            </MessageScreen>}
        </>
    )
}

export default MyAccount