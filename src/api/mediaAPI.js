import axiosClient from './axiosClient';

const mediaAPI = {
  downloadFile: () => axiosClient.get('/download'),
  getDataSheet: (file, sheet) => axiosClient.get(`get/${file}/${sheet}`),
  getDataMedia: () => axiosClient.get(`media-formated/`),
  createMedia: (params) => axiosClient.post(`media/create`, params),
};
export default mediaAPI;
