import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

const getTasks = (filters = {}) => {
  const params = {};
  if (filters.priority && filters.priority !== "All") params.priority = filters.priority;
  if (filters.status && filters.status !== "All") params.status = filters.status;
  return axios.get(API_URL, { params });
};

const createTask = (taskData) => axios.post(API_URL, taskData);

const updateTask = (id, taskData) => axios.put(`${API_URL}/${id}`, taskData);

const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

export default { getTasks, createTask, updateTask, deleteTask };
