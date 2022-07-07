import React from 'react'
import Spinner2 from './Spinner2'

function Loading({ children, loading = false }) {

    if (loading) {
        return (
            <div className='loading-container'>
                <Spinner2/>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default Loading