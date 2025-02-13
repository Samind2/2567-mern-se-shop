import api from "./api";
const API_URL = "/cart";

const getCart = async () => {
 return await api.get(`${API_URL}`);
}

const getByemail = async (email) => {
 return await api.get(`${API_URL}/${email}`);
};

const createCart = async (data) => {
 return await api.post(`${API_URL}`, data);
}

const updateCart = async (id, data) => {
 return await api.put(`${API_URL}/${id}`, data);
}

const deleteCartItem = async (id) => {
 return await api.delete(`${API_URL}/${id}`);
}

const clearAllItem = async (email) => {
 return await api.delete(`${API_URL}/clear/${email}`);
}

const CartService = {
 getCart,
 getByemail,
 createCart,
 updateCart,
 deleteCartItem,
 clearAllItem
};

export default CartService;
