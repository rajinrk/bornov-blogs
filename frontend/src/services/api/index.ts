import { createAxiosInstance } from './axiosConfig';

const defaultHeader = { 'Content-type': 'application/json' };

const getToken = () => sessionStorage.getItem('bornov-token');

const authHeader = () => getToken() && `Bearer ${getToken()}`;

export const loginAPI = async (values: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/auth/login',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data: values
  });
};

