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

export const logoutUser = (username) => {
  return axios.post(`/api/public/user/logout/${username}`);
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

export const getUserByUsername = (username) => {
  return axios.get(`/api/public/user/getUserByUsername?username=${username}`);
};

export const getUserLoginStatus = (username) => {
  return axios.get(`/api/public/user/user_status/${username}`);
};

export const addFavorite = (userId, productId) => {
  return axios.post(`/api/favorites/add`, null, {
    params: { userId, productId }
  });
};


export const getFavoriteProducts = (userId) => {
  return axios.get(`/api/favorites/${userId}`);
};

export const removeFavorite = (userId, productId) => {
  return axios.delete(`/api/favorites/remove`, {
    params: { userId, productId }
  });
};


export const createCart = (cart) => {
  return axios.post(`/api/public/shopping_cart/create`, cart);
};

export const getCart = (username) => {
  return axios.get(`/api/public/shopping_cart/get/${username}`);
};

export const deleteCart = (username) => {
  return axios.delete(`/api/public/shopping_cart/delete/${username}`);
};

export const updateCart = (cart) => {
  return axios.put(`/api/public/shopping_cart/update`, cart);
};

export const addToCart = (username, productId) => {
  return axios.post(`/api/public/shopping_cart/add`, null, {
    params: { username, productId }
  });
};

export const createOrder = (order) => {
  return axios.post(`/api/orders/create`, order);
};

export const getOrderById = (orderId) => {
  return axios.get(`/api/orders/${orderId}`);
};

export const getOrdersByUserId = (userId) => {
  return axios.get(`/api/orders/user/${userId}`);
};

export const updateOrderStatus = (orderId, status) => {
  return axios.put(`/api/orders/updateStatus/${orderId}?status=${status}`);
};

export const deleteOrderById = (orderId) => {
  return axios.delete(`/api/orders/${orderId}`);
};
