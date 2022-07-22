import uploadIcon from '../../assets/buttons-icons/welcome-page-icons/icons8-upload-64.png'
import divideIcon from '../../assets/buttons-icons/welcome-page-icons/icons8-cut-64.png'
import sendIcon from '../../assets/buttons-icons/welcome-page-icons/icons8-send-49.png'
import './Welcome.css';
import logoImg from '../../assets/logo.png';
import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider'
import UserConnect from './UserConnect';
import UserDisConnect from './UserDisConnect';
import ExplainSection from './ExplainSection';

function Welcome() {
  const { user, projects } = useContext(UserContext);

  return (
    <div className='very-first-welcome-container'>
      <div id='welcome-sec1' className='height100vh'>
        <div className='welcome-main-container'>
          <section className='main-welcome-sec welcome-sec'>
            <div className='main-welcome-sec__side1 side'>
              <img className='logo' src={logoImg} alt="logo" />
              <h2>Shared Clip Creator</h2>
              <h3>Create a collaboration clip in 3 steps</h3>
              <ol className='welcome-actions-list'>
                <a href="#welcome-sec2" className='hover-opacity'><li>Upload</li><img src={uploadIcon} alt="i" /></a>
                <a href="#welcome-sec3" className='hover-opacity'><li>Divide</li><img src={divideIcon} alt="i" /></a>
                <a href="#welcome-sec4" className='hover-opacity'><li>Send</li><img src={sendIcon} alt="i" /></a>
              </ol>
              <section>Your participants will receive a simple page where they will be asked to record themselves in a video on top of the sound clip you sent them, or upload a video or photo.</section>
              <section>Once everyone is done you can get the clip edited and ready!</section>
            </div>
            <div className='main-welcome-sec__side2 side'>
              {Object.keys(user).length === 0 ? <UserDisConnect /> : <UserConnect user={user} projects={projects} />}
            </div>
          </section>
        <a href="#welcome-sec2"><div className='down-arrow arrow'></div></a>
        </div>
      </div>
        <ExplainSection image={"IMAGE"} textArr={["step-1_", "text"]} numOfSec={2} />
        <ExplainSection image={"IMAGE"} textArr={["step-2_", "text"]} numOfSec={3} />
        <ExplainSection image={"IMAGE"} textArr={["step-3_", "text"]} numOfSec={4} />
    </div>
  )
}

export default Welcome