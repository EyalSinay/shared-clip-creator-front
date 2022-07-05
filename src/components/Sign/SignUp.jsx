import React from 'react'
import SignUpForm from './SignUpForm';

// !if token, ask sign out first
function SignUp() {
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
      <SignUpForm />
    </div>
  );
}

export default SignUp;