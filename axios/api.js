import AxiosInst from "./instance";

const API = {};

// ------------------------ AUTH APIS ------------------------

/**
 * Register a new user
 * @param {Object} param0
 * @param {string} param0.username - User's chosen username
 * @param {string} param0.email - User's email address
 * @param {string} param0.password - User's password
 */
API.register = async (body) => {
    return AxiosInst.post('auth/register/', body)
};

API.login = async (body) => {
    return AxiosInst.post('auth/login/', body);
};

/**
 * User logout
 */
API.logout = async () => {
  try {
    const response = await AxiosInst.post('auth/logout/');
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

API.getProducts = async () => {
  return AxiosInst.get(`products/`);
};

/**
 * Get details of a specific product
 * @param {number} id - Product ID
 */
API.getProductDetails = async (id) => {
  try {
    const response = await AxiosInst.get(`products/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

API.addToCart = async ({ productId, quantity =1}) => {
  return AxiosInst.post('cart/add/', { productId, quantity });
};

/**
 * Get current user's cart
 */
API.getCart = async () => {
  return AxiosInst.get('cart/');
};

/**
 * Remove product from cart
 * @param {number} productId - Product ID to remove
 */
API.removeFromCart = async (productId) => {
  return AxiosInst.delete(`cart/remove/${productId}/`);
};

/**
 * Clear all items in the cart
 */
API.clearCart = async () => {
  try {
    const response = await AxiosInst.delete('cart/clear/');
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

API.placeOrderDirect = async (orderDetails) => {
  return AxiosInst.post('orders/buy', orderDetails);
};
API.checkoutCart = async () => {
  return AxiosInst.post('orders/checkout');
};



/**
 * Get all orders for a user
 */
API.getAllOrders = async () => {
  return AxiosInst.get('orders/');
};

API.getOrderDetails = async (id) => {
  try {
    const response = await AxiosInst.get(`orders/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
};

// ------------------------ REPORTS APIS ------------------------

/**
 * Get sales report by category
 */
API.getSalesReportByCategory = async () => {
  try {
    const response = await AxiosInst.get('reports/sales-by-category/');
    return response.data;
  } catch (error) {
    console.error('Error fetching sales report by category:', error);
    throw error;
  }
};

/**
 * Get daily revenue report for the last 7 days
 */
API.getDailyRevenue = async () => {
  try {
    const response = await AxiosInst.get('reports/daily-revenue/');
    return response.data;
  } catch (error) {
    console.error('Error fetching daily revenue:', error);
    throw error;
  }
};

export default API;
