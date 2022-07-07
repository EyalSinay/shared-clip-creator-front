import './Sign.css';
import React, { useContext } from 'react';
import SignUpForm from './SignUpForm';
import SignOutFirst from './SignOutFirst';
import Spinner from '../global-components/Spinner';
import { UserContext } from '../../providers/UserProvider';

function SignUp() {
  const { user, loadingUser } = useContext(UserContext);


  if (loadingUser) {
    return <Spinner />
  }


  return (
    <div className="container sign-up">
        <header>
          <h1 className='center-text'>Sign Up</h1>
          <h2 className='center-text'>
            <section>
              What fun you chose to join us!
            </section>
            <section>
              In a moment you will start editing your video...
            </section>
            <section>
              Create an account and lets started!
            </section>
          </h2>
        </header>
        {Object.keys(user).length === 0 ? <SignUpForm /> : <SignOutFirst user={user} />}
    </div>
  );
}

export default SignUp;