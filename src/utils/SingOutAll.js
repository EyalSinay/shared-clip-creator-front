import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const signOutAll = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        await axios.post(BASE_URL + "/users/signoutAll", {}, config);
        localStorage.clear();
    } catch (err) {
        console.error(err);
    }
}

export default signOutAll;