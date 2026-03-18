import { useCallback, useEffect, useState } from "react"
import { findUser } from "./SearchUser.api";
import { UserContext } from "./UserContext";
import { createPrivateConversation } from "./PrivateConversation.api";
import { getUserInfo } from "./getUserInformation";
import { FriendRequest } from "./FriendRequest.api";
import { FindRequest } from "./FindReuqest.api";
import { SetStatus } from "./SetStatus.api";

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState([]);
    const [request, setRequest] = useState([]);
    //Search User
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
    // create conversation between user
    const handleCreatePrivateConversation = useCallback(async (receiverId) => {
        try {
            const res = await createPrivateConversation(receiverId);
            setMessage(res.data);
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
    // fetch user information
    const getUserInformation = useCallback(async () => {
        try {
            const res = await getUserInfo();
            setUserInfo(res.data);
        } catch (e) {
            console.log("Loi: ", e);
        }
    }, [])
    //send friend request to user
    const sendRequest = useCallback(async (receiverId) => {
        try {
            setLoading(true)
            const res = await FriendRequest(receiverId)
            return {
                success: true,
                data: res.data
            }
        } catch (e) {
            return {
                success: false,
                error: e
            }
        }
    }, [])
    // get friend request from another user
    const findRequest = useCallback(async () => {
        try {
            const res = await FindRequest();
            setRequest(res.data)
        } catch (e) {
            console.error("Loi: ", e)
        }
    }, [])
    // accept or reject friend request
    const setStatus = useCallback(async (data) => {
        try {
            const res = await SetStatus(data)
            return {
                success: true,
                data: res.data
            }
        } catch (e) {
            console.log("Loi: ", e)
            return {
                success: false,
                error: e
            }
        }
    }, [])
    useEffect(
        () => {
            handleSearchUser("");
        }
        , [handleSearchUser])
    useEffect(() => {
        getUserInformation();
        findRequest();
    }, [])
    return (
        <UserContext.Provider value={{
            loading,
            user,
            userInfo,
            message,
            request,
            handleSearchUser,
            handleCreatePrivateConversation,
            getUserInformation,
            sendRequest,
            setStatus
        }}>
            {children}
        </UserContext.Provider>
    )
}