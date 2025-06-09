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

export const registerAPI = async (values: any): Promise<any> => {
  return createAxiosInstance({
    url: '/api/auth/register',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data: values
  });
};


export const createPostAPI = async (data: any) => {
  return createAxiosInstance({
    url: '/api/posts',
    method: 'POST',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data,
  });
};

export const getPostsAPI = async () => {
  return createAxiosInstance({
    url: '/api/posts',
    method: 'GET',
    headers: { ...defaultHeader, Authorization: authHeader() },
  });
};

export const updatePostAPI = async ({ id, ...data }: any) => {
  return createAxiosInstance({
    url: `/api/posts/${id}`,
    method: 'PUT',
    headers: { ...defaultHeader, Authorization: authHeader() },
    data,
  });
};

export const deletePostAPI = async (id: string) => {
  return createAxiosInstance({
    url: `/api/posts/${id}`,
    method: 'DELETE',
    headers: { ...defaultHeader, Authorization: authHeader() },
  });
}; 

