import React from 'react'

function ExplainSection({ image, textArr, numOfSec }) {
    return (
        <div id={`welcome-sec${numOfSec}`} className='height100vh'>
            <div className='welcome-main-container'>
                <a href={`#welcome-sec${numOfSec - 1}`}><div className='up-arrow arrow'></div></a>
                <section className='main-welcome-sec welcome-sec'>
                    <div className={`main-welcome-sec__side${(numOfSec + 1) % 2 + 1} side`}>
                        <section>{textArr}</section>
                    </div>
                    <div className={`main-welcome-sec__side${(numOfSec + 1) % 2} side`}>
                        {image}
                    </div>
                </section>
                {numOfSec + 1 <= 4 && <a href={`#welcome-sec${numOfSec + 1}`}><div className='down-arrow arrow'></div></a>}
            </div>
        </div>
    )
}

export default ExplainSection


