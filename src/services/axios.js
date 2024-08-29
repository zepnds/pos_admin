const axiosInstance = await axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_URI}`,
  timeout: 1000
});

export default axiosInstance;
