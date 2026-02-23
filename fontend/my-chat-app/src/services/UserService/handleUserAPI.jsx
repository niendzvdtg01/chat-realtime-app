import { useCallback, useState } from "react"
import { findUser } from "./SearchUser.api";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const handleSearachUser = useCallback(async (keyword) => {
        try {
            setLoading(true)
            const res = await findUser(keyword);
            setUser(res.data);
        } catch (e) {
            console.error('Loi: ', loi);
        } finally {
            setLoading(false)
        }
    }, [])
    return (
        <UserContext.Provider value={{ loading, user, handleSearachUser }}>
            {children}
        </UserContext.Provider>
    )
} 