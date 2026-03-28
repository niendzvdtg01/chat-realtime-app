import { userServiceClient } from "./httpClient";
export const FindRequest = () => {
    return userServiceClient.get("/api/find_request");
}
