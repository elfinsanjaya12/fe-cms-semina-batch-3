import axios from 'axios';
import handleError from './handleError';
import { config } from '../configs';

export async function getData(url, params) {
  try {
    return await axios.get(`${config.api_host_dev}${url}`, {
      params,
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function postData(url, payload, formData) {
  try {
    return await axios.post(`${config.api_host_dev}${url}`, payload, {
      headers: {
        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      },
    });
  } catch (err) {
    return handleError(err);
  }
}

export async function putData(url, payload) {
  try {
    return await axios.put(`${config.api_host_dev}${url}`, payload);
  } catch (err) {
    return handleError(err);
  }
}

export async function deleteData(url) {
  try {
    return await axios.delete(`${config.api_host_dev}${url}`);
  } catch (err) {
    return handleError(err);
  }
}
