import React from 'react'
import { useNavigate } from 'react-router-dom';
import SignOut from '../Sign/SignOut';
import SignOutAll from '../Sign/SignOutAll';

function UserConnect({ user }) {
    const navigate = useNavigate();
    console.log(user);

    return (
        <>
            <h2>{`Hello ${user.name}!`}</h2>
            <section className='projects-list options'>
                {user.projects.map(project => <button key={project._id} onClick={() => navigate('/project/' + project._id)}>{project.projectName}</button>)}
            </section>
            <section className='create-new-project options'>
                <button>Create a new project</button>
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