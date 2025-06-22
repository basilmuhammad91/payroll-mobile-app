import axios from 'axios';

const API_BASE_URL = 'http://82.112.254.65:3000/api';

// Helper function to build query parameters
const buildQueryParams = (params) => {
  const query = new URLSearchParams();
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      query.append(key, params[key]);
    }
  });
  
  return query.toString();
};

// Helper function to extract pagination params from resource URL
const extractPaginationFromResource = (resource) => {
  const url = new URL(`${API_BASE_URL}/${resource}`);
  const params = new URLSearchParams(url.search);
  
  return {
    baseResource: resource.split('?')[0], // Remove existing query params
    existingParams: Object.fromEntries(params.entries())
  };
};

// Enhanced getAll function with pagination support
export const getAll = (resource, page = 1, limit = 10, additionalParams = {}) => {
  const { baseResource, existingParams } = extractPaginationFromResource(resource);
  
  const params = {
    ...existingParams,
    page,
    limit,
    ...additionalParams
  };
  
  const queryString = buildQueryParams(params);
  const url = `${API_BASE_URL}/${baseResource}${queryString ? `?${queryString}` : ''}`;
  
  return axios.get(url);
};

// Original functions remain the same
export const getOne = (resource, id) => axios.get(`${API_BASE_URL}/${resource}/${id}`);
export const createOne = (resource, data) => {
  const { baseResource } = extractPaginationFromResource(resource);
  const payload = {data: [data]}
  console.log("data...", data)
  const response = axios.post(`${API_BASE_URL}/${baseResource}`, payload);
  return response;
};
export const updateOne = (resource, id, data) => {
  const { baseResource } = extractPaginationFromResource(resource);
  return axios.put(`${API_BASE_URL}/${baseResource}/${id}`, data);
};
export const deleteOne = (resource, id) => {
  const { baseResource } = extractPaginationFromResource(resource);
  return axios.delete(`${API_BASE_URL}/${baseResource}/${id}`);
};

// Advanced search function with pagination
export const searchAll = (resource, searchParams = {}, page = 1, limit = 10) => {
  const { baseResource, existingParams } = extractPaginationFromResource(resource);
  
  const params = {
    ...existingParams,
    page,
    limit,
    ...searchParams
  };
  
  const queryString = buildQueryParams(params);
  const url = `${API_BASE_URL}/${baseResource}/search${queryString ? `?${queryString}` : ''}`;
  
  return axios.get(url);
};

// Bulk operations
export const createMany = (resource, dataArray) => {
  const { baseResource } = extractPaginationFromResource(resource);
  return axios.post(`${API_BASE_URL}/${baseResource}/bulk`, { data: dataArray });
};

export const updateMany = (resource, updates) => {
  const { baseResource } = extractPaginationFromResource(resource);
  return axios.put(`${API_BASE_URL}/${baseResource}/bulk`, { updates });
};

export const deleteMany = (resource, ids) => {
  const { baseResource } = extractPaginationFromResource(resource);
  return axios.delete(`${API_BASE_URL}/${baseResource}/bulk`, { data: { ids } });
};

// Export utility functions for external use
export const utils = {
  buildQueryParams,
  extractPaginationFromResource
};