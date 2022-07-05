import React from 'react';
import { Link } from 'react-router-dom';
import FormField from './FormField';
import RememberMe from './RememberMe';
import SignButton from './SignButton';

function SignInForm() {
  return (
    <div className="sign-in">
      <form className='sign-form-container'>
        <div className="fields-container">
          <FormField type={"email"} field={"Email"} />
          <FormField type={"password"} field={"Password"} />
          <RememberMe />
        </div>
        <SignButton />
      </form>
      <div className="other-sign-type center-text">
        <span>Do you already have an account? </span>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  )
}

export default SignInForm