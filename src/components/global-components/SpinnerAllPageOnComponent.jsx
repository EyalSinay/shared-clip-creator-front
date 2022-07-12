import './SpinnerAllPageOnComponent.css'
import React from 'react'

function SpinnerAllPageOnComponent({loading}) {
  return (
    <div>
        {loading && <div className='background'>Loading...</div>}
    </div>
  )
}

export default SpinnerAllPageOnComponent