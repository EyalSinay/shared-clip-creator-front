import React from 'react';
import { useContext } from 'react';
import signOutAll from '../../utils/SingOutAll.js';
import { UserContext } from '../../providers/UserProvider.jsx';

function SignOutAll() {
  const { setUser } = useContext(UserContext);

  const onSignOutAllClick = async () => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      try {
        await signOutAll(token);
      } catch (err) {
        console.error(err);
      }
    }
    setUser({});
  }

  return (
    <button className='simple-btn' onClick={onSignOutAllClick}>Sign out from all devices</button>
  )
}

export default SignOutAll;