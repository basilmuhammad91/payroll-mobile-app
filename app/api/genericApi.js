import axios from 'axios';

const API_BASE_URL = 'http://82.112.254.65:3000/api';

export const getAll = (resource) => axios.get(`${API_BASE_URL}/${resource}`);
export const getOne = (resource, id) => axios.get(`${API_BASE_URL}/${resource}/${id}`);
export const createOne = (resource, data) => axios.post(`${API_BASE_URL}/${resource}`, data);
export const updateOne = (resource, id, data) => axios.put(`${API_BASE_URL}/${resource}/${id}`, data);
export const deleteOne = (resource, id) => axios.delete(`${API_BASE_URL}/${resource}/${id}`);
