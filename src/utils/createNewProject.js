import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const createNewProject = async (token, projectName) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const results = await axios.post(BASE_URL + "/users/projects", {projectName}, config);
        return results.data;
    } catch (err) {
        console.error(err);
    }
}

export default createNewProject;