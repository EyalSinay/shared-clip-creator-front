import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectsNavigate({ projects }) {
    const navigate = useNavigate();
    return (
        <>
            {projects.map(project => <button className='simple-btn' key={project._id} onClick={() => navigate('/project/' + project._id)}>{project.projectName}</button>)}
        </>
    )
}

export default ProjectsNavigate