const BASE_URL = "/api";

async function request(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("admin_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
}

export const api = {
  login: (credentials: any) => request("/admin/login", { method: "POST", body: JSON.stringify(credentials) }),
  register: (credentials: any) => request("/admin/register", { method: "POST", body: JSON.stringify(credentials) }),
  
  // Products
  getProducts: () => request("/products"),
  createProduct: (data: any) => request("/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id: string, data: any) => request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProduct: (id: string) => request(`/products/${id}`, { method: "DELETE" }),

  // Services
  getServices: () => request("/services"),
  createService: (data: any) => request("/services", { method: "POST", body: JSON.stringify(data) }),
  updateService: (id: string, data: any) => request(`/services/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteService: (id: string) => request(`/services/${id}`, { method: "DELETE" }),

  // Collections
  getCollections: () => request("/collections"),
  createCollection: (data: any) => request("/collections", { method: "POST", body: JSON.stringify(data) }),
  updateCollection: (id: string, data: any) => request(`/collections/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCollection: (id: string) => request(`/collections/${id}`, { method: "DELETE" }),

  // Formations
  getFormations: () => request("/formations"),
  createFormation: (data: any) => request("/formations", { method: "POST", body: JSON.stringify(data) }),
  updateFormation: (id: string, data: any) => request(`/formations/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteFormation: (id: string) => request(`/formations/${id}`, { method: "DELETE" }),

  // Customers
  getCustomers: () => request("/customers"),
  
  // Quotes
  getQuotes: () => request("/quotes"),
  createQuote: (data: any) => request("/quotes", { method: "POST", body: JSON.stringify(data) }),

  // Data Management
  clearEntity: (entity: string) => request(`/admin/clear/${entity}`, { method: "DELETE" }),
  clearAllData: () => request("/admin/clear-all", { method: "DELETE" }),
};
