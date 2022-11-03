import axios from "axios";

const axiosInstance=axios.create({ baseURL :"https://interview-system1.herokuapp.com/"});

export default axiosInstance;