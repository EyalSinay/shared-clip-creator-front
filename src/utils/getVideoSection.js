import axios from 'axios';
import { BASE_URL } from './globalConst.js'

const getVideoSection = async (token, projectId, sectionId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
    };
    try {
        const response = await axios.get(`${BASE_URL}/users/projects/${projectId}/sections/${sectionId}/videoTrack`, config);
        return window.URL.createObjectURL(new Blob([response.data]));
    } catch (err) {
        return "";
    }
}

export default getVideoSection;