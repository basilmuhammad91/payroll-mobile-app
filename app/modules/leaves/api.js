import axios from 'axios';

const API_URL = 'http://82.112.254.65:3000/api/';

export const getLeaves = () => axios.get(API_URL);
export const createLeave = (data) => axios.post(`${API_URL}/employees/leave`, data);
export const updateLeave = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteLeave = (id) => axios.delete(`${API_URL}/${id}`);
