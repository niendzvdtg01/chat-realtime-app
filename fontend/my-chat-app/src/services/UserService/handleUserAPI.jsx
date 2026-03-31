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
import { updateUser } from "./UpdateUser.api";
import { Logout } from "./Logout.api";

export const UserProvider = ({ children }) => {
    const [loadingCount, setLoadingCount] = useState(0);
    const [loadingByAction, setLoadingByAction] = useState({});
    const [user, setUser] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [message, setMessage] = useState([]);
    const [request, setRequest] = useState([]);
    const [friends, setFriends] = useState([]);
    const [group, setGroup] = useState([]);

    const beginLoading = useCallback((action) => {
        setLoadingCount((c) => c + 1);
        if (!action) return;
        setLoadingByAction((prev) => ({
            ...prev,
            [action]: (prev[action] ?? 0) + 1,
        }));
    }, []);

    const endLoading = useCallback((action) => {
        setLoadingCount((c) => Math.max(0, c - 1));
        if (!action) return;
        setLoadingByAction((prev) => {
            const next = Math.max(0, (prev[action] ?? 0) - 1);
            return { ...prev, [action]: next };
        });
    }, []);

    const loading = loadingCount > 0;
    //Search User
    const handleSearchUser = useCallback(async (keyword) => {
        try {
            beginLoading("searchUser");
            const res = await findUser(keyword);
            setUser(res.data);
        } catch (e) {
            console.error('Loi: ', e);
        } finally {
            endLoading("searchUser");
        }
    }, [beginLoading, endLoading])
    // create conversation between user
    const handleCreatePrivateConversation = useCallback(async (receiverId) => {
        try {
            beginLoading("privateConversation");
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
        } finally {
            endLoading("privateConversation");
        }
    }, [beginLoading, endLoading])
    // fetch user information
    const getUserInformation = useCallback(async () => {
        try {
            beginLoading("userInfo");
            const res = await getUserInfo();
            setUserInfo(res.data);
        } catch (e) {
            console.log("Loi: ", e);
        } finally {
            endLoading("userInfo");
        }
    }, [beginLoading, endLoading])

    const updateUserInformation = useCallback(async (formData) => {
        try {
            beginLoading("updateUser");
            const res = await updateUser(formData);
            await getUserInformation();
            return {
                success: true,
                data: res.data,
            }
        } catch (e) {
            console.log("Loi: ", e);
            return {
                success: false,
                error: e
            }
        } finally {
            endLoading("updateUser");
        }
    }, [beginLoading, endLoading, getUserInformation])
    //send friend request to user
    const sendRequest = useCallback(async (receiverId) => {
        try {
            beginLoading("sendRequest");
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
        } finally {
            endLoading("sendRequest");
        }
    }, [beginLoading, endLoading])
    // get friend request from another user
    const findRequest = useCallback(async () => {
        try {
            beginLoading("findRequest");
            const res = await FindRequest();
            setRequest(res.data)
        } catch (e) {
            console.error("Loi: ", e)
        } finally {
            endLoading("findRequest");
        }
    }, [beginLoading, endLoading])
    // accept or reject friend request
    const setStatus = useCallback(async (data) => {
        try {
            beginLoading("setStatus");
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
        } finally {
            endLoading("setStatus");
        }
    }, [beginLoading, endLoading])
    //get friend information
    const getFriends = useCallback(async () => {
        try {
            beginLoading("friends");
            const res = await getAllFriends();
            setFriends(res.data)
        } catch (e) {
            console.error("Loi: ", e)
        } finally {
            endLoading("friends");
        }
    }, [beginLoading, endLoading])
    //create group function
    const createGroups = useCallback(async (data) => {
        try {
            beginLoading("createGroup");
            const res = await createGroup(data);
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
            endLoading("createGroup");
        }
    }, [beginLoading, endLoading])
    //get all group
    const getAllGroup = useCallback(async () => {
        try {
            beginLoading("groups");
            const res = await getGroup();
            setGroup(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            endLoading("groups");
        }
    }, [beginLoading, endLoading])

    //get group messages response
    const getGroupMessage = useCallback(async (userId) => {
        try {
            beginLoading("groupMessages");
            const res = await getGroupMessages(userId);
            setMessage(res.data)
        } catch (e) {
            console.error("Loi: ", e);
        } finally {
            endLoading("groupMessages");
        }
    }, [beginLoading, endLoading])

    //logout
    const UserLogout = useCallback(async () => {
        try {
            const res = await Logout();
            return {
                success: true,
                data: res.data
            }
        } catch (e) {
            console.error("Loi: ", e)
            return {
                success: false,
                error: e
            }
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
            loadingByAction,
            user,
            userInfo,
            message,
            request,
            friends,
            group,
            handleSearchUser,
            handleCreatePrivateConversation,
            getUserInformation,
            updateUserInformation,
            sendRequest,
            setStatus,
            getFriends,
            createGroups,
            getGroupMessage,
            UserLogout
        }}>
            {children}
        </UserContext.Provider>
    )
}
