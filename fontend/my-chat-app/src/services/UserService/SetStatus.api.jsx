import { userServiceClient } from "./httpClient";
export const SetStatus = (data) => {
    return userServiceClient.post("/api/status", data);
}
