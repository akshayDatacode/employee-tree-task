import axios from 'axios'
const baseURL = "http://www.localhost:5000"

export const loginAPI = (data) => {
  return axios
    .post(`${baseURL}/login`, data)
    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem('user', res.data);
        return { success: true, data: res };
      } else {
        return { success: false, data: res };
      }
    })
    .catch((error) => {
      console.log("user login Error", error);
      return { success: false, error: error };
    });
};

export const createEmplyeeAPI = (data) => {
  return axios
    .post(`${baseURL}/`, data)
    .then((res) => {
      if (res.status === 200) {
        return { success: true, data: res };
      } else {
        return { success: false, data: res };
      }
    })
    .catch((error) => {
      console.log("employee create Error", error);
      return { success: false, error: error };
    });
};