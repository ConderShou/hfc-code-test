import api from "../lib/api";

export const getContentByUser = (userId) => api.get(`/content/${userId}`);
export const changeContentStatus = (userId, contentId, status) => api.put(`/content/status`, { userId, contentId, status });