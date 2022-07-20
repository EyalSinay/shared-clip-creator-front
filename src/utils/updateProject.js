import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const updateProject = async (token, projectId, body) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    try {
        const response = await axios.patch(BASE_URL + "/users/projects/" + projectId, body, config);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export default updateProject;