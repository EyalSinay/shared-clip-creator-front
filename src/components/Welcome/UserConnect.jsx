import React from 'react'
import SignOut from '../Sign/SignOut';
import SignOutAll from '../Sign/SignOutAll';
import CreateNew from './CreateNew';
import ProjectsNavigates from './ProjectsNavigate';

function UserConnect({ user }) {
    return (
        <>
            <h2>{`Hello ${user.name}!`}</h2>
            {user.projects && <section className='projects-list options'>
                <ProjectsNavigates projects={user.projects} />
            </section>}
            <section className='create-new-project options'>
                <CreateNew />
            </section>
            <section className='sign-out-options options'>
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