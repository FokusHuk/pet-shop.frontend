import axios from "axios";

const apiBaseUrl = "http://localhost:5000";

const instance = axios.create({
    baseURL: apiBaseUrl
  });

export const getPets = () => instance.get(`/pets`).then(result => result.data);
export const getBalance = () => instance.get(`/sales/balance`).then(result => result.data);
export const getCartPets = () => instance.get(`/cart`).then(result => result.data);
export const getCost = () => instance.get(`/sales/cost`).then(result => result.data);
export const addToCart = (petId: string) => instance.post(`/cart/${petId}`);
export const removeFromCart = (petId: string) => instance.delete(`/cart/${petId}`);
export const buyPets = () => instance.post(`/sales`);