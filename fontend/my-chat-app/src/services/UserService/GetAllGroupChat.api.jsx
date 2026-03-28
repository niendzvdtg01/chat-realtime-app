import { userServiceClient } from "./httpClient";
export const getGroup = () => {
    return userServiceClient.get("/api/group/get_group");
}
