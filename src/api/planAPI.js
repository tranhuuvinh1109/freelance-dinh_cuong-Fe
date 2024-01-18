import axiosClient from './axiosClient';

const planAPI = {
  createPlan: (params) => axiosClient.post('/plan/create', params),
  updatePlan: (id, params) => axiosClient.put(`plan/update/${id}/`, params),
  getPlanDetail: (id) => axiosClient.get(`plan/${id}/`),
  getAllPlan: () => axiosClient.get(`plan/`),
};
export default planAPI;
