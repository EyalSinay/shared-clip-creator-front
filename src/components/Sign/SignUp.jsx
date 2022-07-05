import React from 'react'
import SignUpForm from './SignUpForm';

function SignUp() {
  return (
    <div className="container sign-up">
      <header>
        <h1 className='center-text'>SignUp</h1>
        <h2 className='center-text'>What fun you chose to join us!
          In a moment you will start editing your video...
          Create an account and lets started!</h2>
      </header>
      <SignUpForm />
    </div>
  );
}

export default SignUp;