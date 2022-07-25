import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const deleteAccount = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.delete(BASE_URL + "/users/user", config);
        localStorage.clear();
        console.log(response);
    } catch (err) {
        console.error(err);
    }
}

export default deleteAccount;