import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const deleteProject = async (token, projectId) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const results = await axios.delete(BASE_URL + "/users/projects/" + projectId, config);
        return results.data;
    } catch (err) {
        console.error(err);
    }
}

export default deleteProject;