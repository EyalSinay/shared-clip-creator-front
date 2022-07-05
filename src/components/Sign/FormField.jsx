import './Sign.css'
import React from 'react';


function FormField({type, field}) {
  return (
    <div className='form-field-container'>
        <label className='sign-form-label sign-form' htmlFor={field}>{`${field}: `}</label>
        <input className='sign-form-input sign-form' type={type} name={field} id={field} />
    </div>
  )
}

export default FormField