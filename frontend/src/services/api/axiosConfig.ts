import axios from 'axios';

export const createAxiosInstance = async (info: any) => {
  try {
    const { url, method, headers, data, params } = info;
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8008/',
      headers
    });

    return await axiosInstance({ url, method, headers, data, params, timeout: 120000 });
  } catch (error: any) {

    return { data: { status_code: 'E-10001' } };
  }
};