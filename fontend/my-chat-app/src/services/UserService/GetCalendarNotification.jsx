import { userServiceClient } from "./httpClient"

export const GetCalendarNotification = (conversationId) => {
    return userServiceClient.get("/api/ai/get_calendar_notifications", {
        params: { conversationId }
    });
}
