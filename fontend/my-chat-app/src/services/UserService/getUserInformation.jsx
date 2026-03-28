import { userServiceClient } from "./httpClient";
export const getUserInfo = () => {
    return userServiceClient.get("/user/get_userinfo");
}
