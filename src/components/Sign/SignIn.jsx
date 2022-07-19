import './Sign.css';
import React, { useContext } from 'react';
import SignInForm from './SignInForm'
import SignOutFirst from './SignOutFirst';
import Spinner from '../global-components/Spinner';
import { UserContext } from '../../providers/UserProvider';
import NavBar from '../global-components/NavBar';


function SignIn() {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) {
    return <Spinner />
  }

  return (
    <>
      <NavBar />
      <div className="container sign-in">
        <header>
          <h1 className='center-text'>Sign In</h1>
          <h2 className='center-text'>Welcome to Shared Clip Creator</h2>
        </header>
        {Object.keys(user).length === 0 ? <SignInForm /> : <SignOutFirst user={user} />}
      </div>
    </>
  );
}

export default SignIn