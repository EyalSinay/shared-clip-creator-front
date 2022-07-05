import React from 'react'

function RememberMe() {
  return (
    <div className='remember-me-container'>
        <input type="checkbox" name="remember-me" id="remember-me" className='remember-me-check-box' />
        <label htmlFor="remember-me">Remember Me</label>
    </div>
  )
}

export default RememberMe