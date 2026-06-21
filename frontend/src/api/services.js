import client from "./client";

// Products
export const getProducts = (params) => client.get("/products", { params });
export const getProduct = (id) => client.get(`/products/${id}`);
export const createProduct = (data) => client.post("/products", data);
export const updateProduct = (id, data) => client.put(`/products/${id}`, data);
export const deleteProduct = (id) => client.delete(`/products/${id}`);

// Categories
export const getCategories = () => client.get("/categories");
export const createCategory = (data) => client.post("/categories", data);
export const updateCategory = (id, data) => client.put(`/categories/${id}`, data);
export const deleteCategory = (id) => client.delete(`/categories/${id}`);

// Auth
export const registerUser = (data) => client.post("/auth/register", data);
export const loginUser = (data) => client.post("/auth/login", data);
export const getMe = () => client.get("/auth/me");
export const addAddress = (data) => client.post("/auth/address", data);

// Orders
export const placeOrder = (data) => client.post("/orders", data);
export const getMyOrders = () => client.get("/orders/my");
export const getOrder = (id) => client.get(`/orders/${id}`);

// AI Assistant
export const sendChatMessage = (message) => client.post("/ai/chat", { message });

// Contact
export const submitContact = (data) => client.post("/contact", data);

// Admin
export const getAdminStats = () => client.get("/admin/stats");
export const getAdminOrders = () => client.get("/admin/orders");
export const updateOrderStatus = (id, status) => client.put(`/admin/orders/${id}/status`, { order_status: status });
export const getAdminCustomers = () => client.get("/admin/customers");
export const deleteCustomer = (id) => client.delete(`/admin/customers/${id}`);
