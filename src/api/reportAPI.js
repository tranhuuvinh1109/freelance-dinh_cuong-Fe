import axiosClient from './axiosClient';

const reportAPI = {
  downloadReport: () => axiosClient.get('report/download'),
  createReport: (params) => axiosClient.post('report/create', params),
  getReportByLocationAndDate: (location, date) => axiosClient.get(`report/${location}/${date}`),
  getAllReport: () => axiosClient.get(`report/get-all`),
};
export default reportAPI;
