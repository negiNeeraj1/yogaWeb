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

export const createClass = async (classData) => {
  try {
    const response = await axios.post(`${BASE_URL}/classes/create`, classData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getClass = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/classes/get`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getClassById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/classes/get/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const uploadClassVideo = async (id, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/classes/${id}/videos`,
      formData,
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getProfile = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/profile/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const getAdminProfile = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/profile/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const createInstructor = async (formData) => {
  try {
    const processedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      YOE: parseInt(formData.YOE),
      rating: formData.rating,
      main_photo: formData.main_photo,
      cover_photo: formData.cover_photo,
      location: Array.isArray(formData.location) ? formData.location : [],
      certifications: Array.isArray(formData.certifications)
        ? formData.certifications
        : [],
      qualifications: Array.isArray(formData.qualifications)
        ? formData.qualifications
        : [],
      specialties: Array.isArray(formData.specialties)
        ? formData.specialties
        : [],
      tips: Array.isArray(formData.tips) ? formData.tips : [],
    };

    const response = await axios.post(`${BASE_URL}/instructors/create`, {
      withCredentials: true,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in createInstructor:", error);
    throw error;
  }
};
