export const API_BASE_URL = `http://localhost:5001`;

export const ENDPOINTS = {
  TASKS: `${API_BASE_URL}/api/tasks`,
  TASKS_BY_ID: (id: string) => `${API_BASE_URL}/api/tasks/${id}`,
  POST_TASK: `${API_BASE_URL}/api/tasks/`,
  DELETE_TASK: (id: string) => `${API_BASE_URL}/api/tasks/${id}`,
};
