import axios from "axios";

const axiosInstance=axios.create({ baseURL :"http://interview-system1.herokuapp.com/"});

export default axiosInstance;