import { data } from "react-router";
import api from "./api";
const API_URL = "/user";

const signJwt = async (email) => {
  return await api.post(`${API_URL}/sign`, { email });
};
const addUser = async (email) => {
  return await api.post(`${API_URL}`, { email });
};
const getAllUsers = async () => {
  return await api.get(`${API_URL}/`);
};
const updateUser = async (id, data) => {
  return await api.put(`${API_URL}/${id}`, data);
};

const deleteUser = async (id) => {
  return await api.delete(`${API_URL}/${id}`); // Use DELETE method
};
const UserService = { signJwt, addUser, getAllUsers, updateUser, deleteUser };

export default UserService;
