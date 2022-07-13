import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const getSection = async (token, projectId, sectionId) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.get(BASE_URL + "/users/projects/" + projectId + "/sections/" + sectionId, config);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export default getSection;