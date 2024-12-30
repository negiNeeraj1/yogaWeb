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

export const LoginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const GetClasses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/classes/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const EnrolledClasses = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/classes/getenrolledclasses/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const CreatePayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payments/create`,
      paymentData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const GetPaymentsByUser = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/payments/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const VerifyPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payments/verify`,
      paymentData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const markAttendance = async (classId) => {
  try {

    console.log("Sending attendance mark for ID:", classId);

    const response = await axios.post(
      `${BASE_URL}/attendance/mark`,
      { _id: classId },
      { withCredentials: true }
    );


    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getClassAttendanceStats = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/attendance/stats`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
