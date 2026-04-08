import { userServiceClient } from "./httpClient";

export const createCalendar = async (data) => {
    return userServiceClient.post("/api/ai/calendar", data);
};
