import { userServiceClient } from "./httpClient"

export const Logout = () => {
    return userServiceClient.post("auth/logout");
}