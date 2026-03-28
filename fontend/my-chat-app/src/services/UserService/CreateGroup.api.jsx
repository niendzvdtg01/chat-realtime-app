import { userServiceClient } from "./httpClient";

export const createGroup = (data) => {
    return userServiceClient.post("/api/group/create_group", data);
}
