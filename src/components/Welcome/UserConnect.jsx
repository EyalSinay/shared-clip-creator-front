import React, { useState } from 'react'
import { useEffect } from 'react';
import SignOut from '../Sign/SignOut';
import SignOutAll from '../Sign/SignOutAll';
import CreateNew from './CreateNew';
import MyAccount from './MyAccount';
import ParticipantNavigate from './ParticipantNavigate';
import ProjectsNavigates from './ProjectsNavigate';

function UserConnect({ user, projects }) {
    const [userProjects, setUserProjects] = useState([])
    const [participant, setParticipant] = useState([])

    useEffect(() => {
        if (projects !== undefined) {
            setUserProjects(projects);
        }
        if (user.projectsParticipant !== undefined) {
            setParticipant(user.projectsParticipant);
        }
    }, [userProjects, participant, user, projects]);

    return (
        <>
            <h2>{`Hello ${user.name}!`}</h2>
            {userProjects.length > 0 && <section className='projects-list options'>
                My projects:
                <ProjectsNavigates projects={userProjects} />
            </section>}
            {participant.length > 0 && <section className='projects-list options'>
                Projects I participate in:
                <ParticipantNavigate participant={participant} />
            </section>}
            <section className='create-new-project options'>
                <CreateNew />
            </section>
            <section className='sign-out-options options'>
                <div>
                    <MyAccount />
                </div>
                <div>
                    <SignOut />
                </div>
                <div>
                    <SignOutAll />
                </div>
            </section>
        </>
    )
}

export default UserConnect