import './Welcome.css'
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider'
import UserConnect from './UserConnect';
import UserDisConnect from './UserDisConnect';
import ExplainSection from './ExplainSection';

function Welcome() {
  const { user } = useContext(UserContext);

  return (
    <div className='very-first-welcome-container'>
      <div id='welcome-sec1' className='height100vh'>
        <div className='welcome-main-container'>
          <section className='main-welcome-sec welcome-sec'>
            <div className='main-welcome-sec__side1 side'>
              <h2>Shared Clip Creator</h2>
              <h3>Create a collaboration clip in 3 steps</h3>
              <ol>
                <li>Upload an audio file</li>
                <li>Divide into sections for your participants</li>
                <li>Send everyone links to their sections</li>
              </ol>
              <section>Your participants will receive a simple page where they will be asked to record themselves in a video on top of the sound clip you sent them, or upload a video or photo.</section>
              <section>Once everyone is done you can have the clip edited and ready!</section>
            </div>
            <div className='main-welcome-sec__side2 side'>
              {Object.keys(user).length === 0 ? <UserDisConnect /> : <UserConnect user={user} />}
            </div>
          </section>
        <a href="#welcome-sec2"><div className='down-arrow arrow'></div></a>
        </div>
      </div>
        <ExplainSection image={"IMAGE"} textArr={["text-", "text"]} numOfSec={2} />
        <ExplainSection image={"IMAGE"} textArr={["text-", "text"]} numOfSec={3} />
        <ExplainSection image={"IMAGE"} textArr={["text-", "text"]} numOfSec={4} />
    </div>
  )
}

export default Welcome