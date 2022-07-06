import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const signOut = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        await axios.post(BASE_URL + "/users/signout", {}, config);
        localStorage.clear();
    } catch (err) {
        console.error(err);
    }
}

export default signOut;