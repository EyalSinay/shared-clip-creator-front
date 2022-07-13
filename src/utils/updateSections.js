import axios from 'axios';
import { BASE_URL } from './globalConst.js';

const updateSections = async (token, projectId, sectionsArr) => {
    const bodyArr = [];
    sectionsArr.forEach(sec => {
        bodyArr.push({
            secName: sec.name,
            color: sec.color,
            targetEmail: sec.targetEmail,
            targetPhon: sec.targetPhon,
            secure: sec.secure,
            allowedWatch: sec.allowedWatch,
            secondStart: sec.secondStart,
            secondEnd: sec.secondEnd,
            seenByOwner: sec.seenByOwner,
            vars: sec.vars,
        });
    });

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        const response = await axios.post(BASE_URL + "/users/projects/" + projectId + "/sections", bodyArr, config);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export default updateSections;