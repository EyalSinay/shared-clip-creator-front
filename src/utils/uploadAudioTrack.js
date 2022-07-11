import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const uploadAudioTrack = async (token, projectId, fd) => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
        onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(percentCompleted);
        }
    };
    try {
        const results = await axios.post(BASE_URL + "/users/projects/" + projectId + "/audioTrack", fd, config);
        return results;
    } catch (err) {
        console.error(err);
    }
}

export default uploadAudioTrack;