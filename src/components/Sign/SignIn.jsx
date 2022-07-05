import React from 'react'
import SignInForm from './SignInForm'

// !if token, ask sign out first
function SignIn() {
  return (
    <div className="container sign-in">
      <header>
        <h1 className='center-text'>Sign In</h1>
        <h2 className='center-text'>Welcome to Shared Clip Creator</h2>
      </header>
      <SignInForm />
    </div>
  )
}

export default SignIn