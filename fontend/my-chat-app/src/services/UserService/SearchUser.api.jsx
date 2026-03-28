import { userServiceClient } from "./httpClient";

export const findUser = (keyword) => {
    return userServiceClient.get("/user/find_user", {
        params: { keyword },
    });
}
