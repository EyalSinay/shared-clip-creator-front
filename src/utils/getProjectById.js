import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const getProjectById = async (token, projectId) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const result = await axios.get(BASE_URL + "/users/projects/" + projectId, config);
        return result;
    } catch (err) {
        console.error(err);
    }
}

export default getProjectById;