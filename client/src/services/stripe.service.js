import api from "./api";
const API_URL = "/api/v1/stripe";

const createCheckOutSession = async (data) => {
  return await api.post(`${API_URL}/create-checkout-session`, data);
};

const stripeService = {
  createCheckOutSession,
};
export default stripeService;
