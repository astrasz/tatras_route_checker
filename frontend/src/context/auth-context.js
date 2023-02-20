import { createContext, useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";

export const AuthContext = createContext({
    user: null,
    setUser: (user) => { }
})


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { getItem } = useStorage()

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            setUser(user);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}