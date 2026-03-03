import { useCallback, useEffect, useState } from "react"
import { findUser } from "./SearchUser.api";
import { UserContext } from "./UserContext";
import { createPrivateConversation } from "./PrivateConversation.api";
import { getUserInfo } from "./getUserInformation";

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
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

    const handleCreatePrivateConversation = useCallback(async (receiverId) => {
        try {
            const res = await createPrivateConversation(receiverId);
            return {
                success: true,
                data: res.data
            }
        } catch (e) {
            console.log("Loi", e);
            return {
                success: false,
                error: e
            }
        }
    }, [])
    const getUserInformation = useCallback(async () => {
        try {
            const res = await getUserInfo();
            setUserInfo(res.data);
        } catch (e) {
            console.log("Loi: ", e);
        }
    }, [])
    useEffect(
        () => {
            handleSearchUser("");
            getUserInformation();
        }
        , [handleSearchUser, getUserInformation])
    return (
        <UserContext.Provider value={{ loading, user, userInfo, handleSearchUser, handleCreatePrivateConversation, getUserInformation }}>
            {children}
        </UserContext.Provider>
    )
} 