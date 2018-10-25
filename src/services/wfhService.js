import axios from '../utilities/AxiosInstance';

export const getWFH = employeeId => axios.get(`/workingFromHome/findByEmployeeId/${employeeId}`);

export const requestWFH = dates => axios.post('/workingFromHome/', dates);

export const getWFHById = wfhId => axios.get(`/workingFromHome/${wfhId}`);
