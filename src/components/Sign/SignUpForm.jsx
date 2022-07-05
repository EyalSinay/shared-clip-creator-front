import React from 'react'
import FormField from './FormField'
import SignButton from './SignButton'

function SignUpForm() {
  return (
    <form className='sign-form-container'>
      <div className="fields-container">
        <FormField type={"email"} field={"Email"} />
        <FormField type={"password"} field={"Password"} />
        <FormField type={"text"} field={"Name"} />
      </div>
      <SignButton />
    </form>
  )
}

export default SignUpForm