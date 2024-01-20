import axiosClient from './axiosClient';

const checkAPI = {
  checkServer: () => axiosClient.get('/check/'),
};
export default checkAPI;
