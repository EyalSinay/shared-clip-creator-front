import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const uploadImageSection = async (token, projectId, sectionId, fd) => {
    const config = {
        headers: {
            'content-type': 'image/jpeg',
            Authorization: `Bearer ${token}`
        },
        onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(percentCompleted);
        }
    };
    try {
        const results = await axios.patch(BASE_URL + "/users/projects/" + projectId + "/sections/" + sectionId + "/image", fd, config);
        return results;
    } catch (err) {
        console.error(err);
    }
}

export default uploadImageSection;