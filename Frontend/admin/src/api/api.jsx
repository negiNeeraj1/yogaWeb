import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const SignUpAdmin = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const LoginAdmin = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
