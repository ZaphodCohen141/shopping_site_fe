import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8090';

export const searchProducts = (productName) => {
  return axios.get(`/api/product/public/searchProducts/${productName}`);
};

export const getProductsByNumber = (limit) => {
  return axios.get(`/api/product/public/getProducts?limit=${limit}`);
};

export const getAllProducts = () => {
  return axios.get('/api/product/public/getAllProducts');
};

export const getProductById = (id) => {
  return axios.get(`/api/product/public/getProductById?id=${id}`);
};

export const updateProductImageUrl = (productName) => {
  return axios.get(`/api/product/updateProductImageUrl?productName=${productName}`);
};

export const loginUser = (credentials) => {
  return axios.post(`/api/public/user/login`, credentials);
};

export const registerUser = (user) => {
  return axios.post(`/api/user/public/register`, user);
};

export const deleteUser = (username) => {
  return axios.delete(`/api/user/private/delete?username=${username}`);
};

export const checkUserExists = (username) => {
  return axios.get(`/api/public/user/checkUserExists?username=${username}`);
};

export const createNewUser = (user) => {
  return axios.post(`/api/public/user/create`, user);
};
