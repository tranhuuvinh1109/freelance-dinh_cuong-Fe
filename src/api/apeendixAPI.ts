import axiosClient from './axiosClient';

const appendixAPI = {
  createAppendix: (params) => axiosClient.post('appendix/create/', params),
  getAllAppendix: () => axiosClient.get(`appendix/`),
  getAppendixByID: (id) => axiosClient.get(`appendix/${id}/`),
  updateAppendix: (id, params) => axiosClient.put(`appendix/update/${id}/`, params),
  deleteAppendix: (id) => axiosClient.delete(`appendix/delete/${id}/`),
};
export default appendixAPI;
