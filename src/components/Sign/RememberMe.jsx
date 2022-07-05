import React from 'react'

function RememberMe({onCheckboxChange, valRememberMe}) {
  return (
    <div className='remember-me-container'>
        <input type="checkbox" name="remember-me" id="remember-me" className='remember-me-check-box' onChange={e => onCheckboxChange(e)} checked={valRememberMe} />
        <label htmlFor="remember-me">Remember Me</label>
    </div>
  )
}

export default RememberMe;