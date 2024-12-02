import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const SignUpUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
