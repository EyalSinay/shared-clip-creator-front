import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const sendMailAll = async (token, projectId, idArr) => {  
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.post(BASE_URL + "/users/projects/" + projectId + "/sendMailAll", idArr, config);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export default sendMailAll;