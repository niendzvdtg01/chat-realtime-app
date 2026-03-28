import { userServiceClient } from "./httpClient";
export const getGroupMessages = (conversationId) => {
    return userServiceClient.get("/api/group/get_messages", {
        params: { conversationId },
    });
}
