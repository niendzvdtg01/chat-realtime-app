import { useCallback, useEffect, useState } from "react"
import { findUser } from "./SearchUser.api";
import { UserContext } from "./UserContext";
import { createPrivateConversation } from "./PrivateConversation.api";
import { getUserInfo } from "./getUserInformation";
import { FriendRequest } from "./FriendRequest.api";
import { FindRequest } from "./FindReuqest.api";
import { SetStatus } from "./SetStatus.api";
import { getAllFriends } from "./FindAllFriends.api";
import { createGroup } from "./CreateGroup.api";

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState([]);
    const [request, setRequest] = useState([]);
    const [friends, setFriends] = useState([]);
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
            setRequest(prev => prev.filter(r => r.userId !== data.senderId))
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
    //get friend information
    const getFriends = useCallback(async () => {
        try {
            const res = await getAllFriends();
            setFriends(res.data)
        } catch (e) {
            console.error("Loi: ", e)
        }
    }, [])
    //create group function
    const createGroups = useCallback(async (data) => {
        try {
            setLoading(true)
            const res = createGroup(data);
            return {
                success: true,
                data: res.data,
            }
        } catch (e) {
            console.log("Loi: ", e)
            return {
                success: false,
                error: e
            }
        } finally {
            setLoading(false);
        }
    }, [])
    //
    useEffect(
        () => {
            handleSearchUser("");
        }
        , [handleSearchUser])
    useEffect(() => {
        getUserInformation();
        findRequest();
        getFriends();
    }, [])
    return (
        <UserContext.Provider value={{
            loading,
            user,
            userInfo,
            message,
            request,
            friends,
            handleSearchUser,
            handleCreatePrivateConversation,
            getUserInformation,
            sendRequest,
            setStatus,
            getFriends,
            createGroups
        }}>
            {children}
        </UserContext.Provider>
    )
}