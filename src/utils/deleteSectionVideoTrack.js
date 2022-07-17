import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const deleteSectionVideoTrack = async (token, projectId, sectionId) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const results = await axios.delete(BASE_URL + "/users/projects/" + projectId + "/sections/" + sectionId + "/videoTrack", config);
        return results.data;
    } catch (err) {
        console.error(err);
    }
}

export default deleteSectionVideoTrack;