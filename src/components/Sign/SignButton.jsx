import React from 'react';

function SignButton({notes}) {
  return (
  <div className='sign-button-container'>
    <button type='submit' className='sign-button' />
    <section className='notes'>{notes}</section>
  </div>
  )
}

export default SignButton;