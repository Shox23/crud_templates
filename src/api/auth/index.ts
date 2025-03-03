import apiInstance from "../instance";

export interface LoginData {
  password: string;
  email: string;
}

export const loginRequest = async (data: LoginData) => {
  const response = await apiInstance.post("/login", data);
  return response;
};
