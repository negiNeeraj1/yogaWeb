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

export const GetClassById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/classes/get/${id}`, {
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

export const markAttendance = async (data) => {
  try {
    console.log("Sending attendance mark:", data);
    const response = await axios.post(
      `${BASE_URL}/attendance/mark`,
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Attendance mark error:", error);
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

export const subscriptionPayment = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/subscriptions/pay`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
export const verifySubscriptionPayment = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/subscriptions/verify-payment`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getPlans = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/plans/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const sendForm = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact/send`, data, {
      withCredentials : true
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
} 