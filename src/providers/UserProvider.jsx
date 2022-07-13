import { useState, createContext, useEffect } from 'react';
import getUser from '../utils/getUser';

export const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [token, setToken] = useState("");
    const [loadingUser, setLoadingUser] = useState(false);
    const [errorUser, setErrorUser] = useState({});

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            const token = localStorage.getItem("TOKEN");
            if (token) {
                const auth = async () => {
                    setLoadingUser(true);
                    try {
                        const data = await getUser(token);
                        setUser(data.user);
                        setProjects(data.projects);
                    } catch (err) {
                        setErrorUser(err);
                    }
                    setLoadingUser(false);
                }
                auth();
            }
        }
    }, [user]);

    
    return (
        <UserContext.Provider value={{ user, setUser, loadingUser, errorUser, token, setToken, projects, setProjects }}>
            {children}
        </UserContext.Provider>
    )
}



export default UserProvider;