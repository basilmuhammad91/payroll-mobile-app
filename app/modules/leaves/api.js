import axios from 'axios';

const API_URL = 'https://yourapi.com/users';

export const getLeaves = () => axios.get(API_URL);
export const createLeave = (data) => axios.post(API_URL, data);
export const updateLeave = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteLeave = (id) => axios.delete(`${API_URL}/${id}`);
