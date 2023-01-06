import axios from 'axios';
import {  UserLogin, UserRegister,ForgotUser, ResetUser, updateUserPassword } from "../types";
axios.defaults.withCredentials = true;


const baseUrl = "http://localhost:4000/api/v1/users/";

export const registerUser = async (values: UserRegister) => {
  const res = await axios.post(`${baseUrl}register`, values);
  return res;
};

export const verifyUser = async (token: string | undefined) => {
  const res = await axios.post(`${baseUrl}verify/${token}`);
  return res;
};

export const loginUser = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res;
};

export const forgotPassword = async (values: ForgotUser) => {
  const res = await axios.post(`${baseUrl}forgot-password`, values);
  return res;
};

export const resetPassword = async (
  values: ResetUser,
  token: string | undefined
) => {
  const res = await axios.post(`${baseUrl}reset-password/${token}`, values);
  return res;
};
export const refreshUser = async () => {
  const res = await axios.get(`${baseUrl}refresh`, {
    withCredentials: true,
  });
  return res.data;
};
export const userProfile = async () => {
  const res = await axios.get(`${baseUrl}profile`, {
    withCredentials: true,
  });
  return res.data;
};
export const logoutUser = async () => {
  const res = await axios.post(
    `${baseUrl}logout`,{},
    {
      withCredentials: true,
    }
  );
  return res;
};
export const updateUser = async (values: FormData, id: string) => {
  const res = await axios.put(`${baseUrl}${id}`, values);
  return res;
};

export const changePassword = async (
  values: updateUserPassword,
  id: string
) => {
  const res = await axios.put(`${baseUrl}edit-password/${id}`, values);
  return res;
};