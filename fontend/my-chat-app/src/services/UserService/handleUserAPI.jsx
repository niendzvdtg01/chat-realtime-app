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
import { getGroup } from "./GetAllGroupChat.api";
import { getGroupMessages } from "./getGroupMessages.api";

export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState([]);
    const [request, setRequest] = useState([]);
    const [friends, setFriends] = useState([]);
    const [group, setGroup] = useState([]);
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
    //get all group
    const getAllGroup = useCallback(async () => {
        try {
            const res = await getGroup();
            setGroup(res.data);
        } catch (e) {
            console.error(e);
        }
    }, [])

    //get group messages response
    const getGroupMessage = useCallback(async (userId) => {
        try {
            const res = await getGroupMessages(userId);
            setMessage(res.data)
        } catch (e) {
            console.error("Loi: ", e);
        }
    }, [])
    //fetch user duoc search
    useEffect(
        () => {
            handleSearchUser("");
        }
        , [handleSearchUser])
    //Lay cac thong tin ban dau
    useEffect(() => {
        getUserInformation();
        findRequest();
        getFriends();
        getAllGroup();
    }, [])
    return (
        <UserContext.Provider value={{
            loading,
            user,
            userInfo,
            message,
            request,
            friends,
            group,
            handleSearchUser,
            handleCreatePrivateConversation,
            getUserInformation,
            sendRequest,
            setStatus,
            getFriends,
            createGroups,
            getGroupMessage
        }}>
            {children}
        </UserContext.Provider>
    )
}