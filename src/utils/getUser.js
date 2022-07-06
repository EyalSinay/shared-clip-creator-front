import axios from 'axios';
import { BASE_URL } from './globalConst.js'

const getUser = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const results = await axios.get(BASE_URL + "/users/user", config);
        return results.data;
    } catch (err) {
        throw err;
    }
}

export default getUser;