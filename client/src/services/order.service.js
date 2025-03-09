import api from "./api";
const API_URL = "api/v1/order";

const getOrder = async () => {
    return await api.get(`${API_URL}`);
  };

  const getById = async (id) => {
    return await api.get(`${API_URL}/${id}`);
  };
  const updateOrder = async (id, status) => {
    return await api.put(`${API_URL}/${id}`, { delivery_status: status });
  };
  const deleteOrder = async (id) => {
    return await api.delete(`${API_URL}/${id}`);
  };


const OrderService = {
    getOrder,
    getById,
    updateOrder,
    deleteOrder,
    
  };

export default OrderService;