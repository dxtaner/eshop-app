import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);
    const allowedOrigins = [API_URL];

    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const fetchProducts = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `http://localhost:3033/product?page=${pageParam}`
  );

  return data;
};

export const fetchAllProducts = async () => {
  const { data } = await axios.get(`http://localhost:3033/product`);
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`http://localhost:3033/product/${id}`);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`http://localhost:3033/product/${id}`);
  return data;
};

export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `http://localhost:3033/auth/register`,
    input
  );
  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(`http://localhost:3033/auth/login`, input);
  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(`http://localhost:3033/auth/me`);
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(`http://localhost:3033/auth/logout`, {
    refresh_token: localStorage.getItem("refresh-token"),
  });
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post("http://localhost:3033/order", input);
  return data;
};

export const fetchMyOrders = async (input) => {
  const { data } = await axios.get(
    "http://localhost:3033/order/my-orders",
    input
  );
  return data;
};

export const deleteOrder = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:3033/order/my-orders/${id}`
  );
  return data;
};

export const fetchOrders = async () => {
  const { data } = await axios.get(`http://localhost:3033/order`);
  return data;
};

export const updateProduct = async (id, input) => {
  const { data } = await axios.put(
    `http://localhost:3033/product/${id}`,
    input
  );
  return data;
};

export const createProduct = async (input) => {
  const { data } = await axios.post(`http://localhost:3033/product`, input);
  return data;
};
