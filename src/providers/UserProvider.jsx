import { useState, createContext, useEffect } from 'react';
import getUser from '../utils/getUser';

export const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState({});
    const [loadingUser, setLoadingUser] = useState(false);
    const [errorUser, setErrorUser] = useState({});

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            const token = localStorage.getItem("TOKEN");
            if (token) {
                const auth = async () => {
                    setLoadingUser(true);
                    try {
                        const theUser = await getUser(token);
                        setUser(theUser);
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
        <UserContext.Provider value={{ user, setUser, loadingUser, errorUser }}>
            {children}
        </UserContext.Provider>
    )
}



export default UserProvider;