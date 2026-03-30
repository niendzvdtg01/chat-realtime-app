import { userServiceFormClient } from "./httpClient";

export const updateUser = (formData) => {
  return userServiceFormClient.post("/user/update_user", formData);
};

