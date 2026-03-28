import { userServiceClient } from "./httpClient";

export const getAllFriends = () => {
    return userServiceClient.get("/user/find_all_friends");
}
