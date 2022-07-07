import React from 'react';
import { useContext } from 'react';
import signOut from '../../utils/signOut.js';
import { UserContext } from '../../providers/UserProvider.jsx';

function SignOut() {
  const { setUser } = useContext(UserContext);

  const onSignOutClick = async () => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      try {
        await signOut(token);
      } catch (err) {
        console.error(err);
      }
    }
    setUser({});
  }

  return (
    <button className='simple-btn' onClick={onSignOutClick}>sign out from this device</button>
  )
}

export default SignOut;