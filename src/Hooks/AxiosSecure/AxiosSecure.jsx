import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // or your deployed server URL
});

const AxiosSecure = () => {
    return axiosSecure;
};

export default AxiosSecure;