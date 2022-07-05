import React from 'react';
import { Link } from 'react-router-dom';
import FormField from './FormField';
import RememberMe from './RememberMe';
import SignButton from './SignButton';

function SignUpForm() {
  return (
    <div className="sign-up">
      <form className='sign-form-container'>
        <div className="fields-container">
          <FormField type={"email"} field={"Email"} />
          <FormField type={"password"} field={"Password"} />
          <FormField type={"text"} field={"Name"} />
          <RememberMe />
        </div>
        <SignButton />
      </form>
      <div className="other-sign-type center-text">
        <span>Do you already have an account? </span>
        <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  )
}

export default SignUpForm