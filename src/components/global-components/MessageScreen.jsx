import './MessageScreen.css';
import React from 'react';

function MessageScreen({ children, screenShow = false, turnOff = () => { } }) {

    const onTurnOffClick = (e) => {
        if (e.target === e.currentTarget) {
            turnOff();
        }
    }

    return (
        <>
            {
                screenShow
                &&
                <div className='message-background'
                    onClick={onTurnOffClick}
                >
                    <div className="message-context"
                        onKeyDown={e => { if (e.key === 'Escape') onTurnOffClick(e) }}
                        tabIndex="0"
                    >
                        {children}
                    </div>
                </div>
            }
        </>
    );
}

export default MessageScreen