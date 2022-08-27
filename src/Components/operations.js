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
