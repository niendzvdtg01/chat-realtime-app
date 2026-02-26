import { useCallback, useEffect, useState } from "react"
import { findUser } from "./SearchUser.api";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const handleSearchUser = useCallback(async (keyword) => {
        try {
            setLoading(true)
            const res = await findUser(keyword);
            setUser(res.data);
        } catch (e) {
            console.error('Loi: ', e);
        } finally {
            setLoading(false)
        }
    }, [])
    useEffect(
        () => {
            handleSearchUser("");
        }
        , [handleSearchUser])
    return (
        <UserContext.Provider value={{ loading, user, handleSearchUser }}>
            {children}
        </UserContext.Provider>
    )
} 