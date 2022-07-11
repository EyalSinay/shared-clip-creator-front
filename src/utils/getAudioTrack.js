import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const getAudioTrack = async (token, projectId) => {
    const config = {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.get(BASE_URL + "/users/projects/" + projectId + "/audioTrack", config);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        return url;
    } catch (err) {
        console.error(err);
    }
}

export default getAudioTrack;