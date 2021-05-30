import axios from 'axios';
const api = 'http://localhost:3000/api/v1/';

export const getUserList = (data) => {
    return axios.post(api + 'user/list', data);
}

export const createUser = (data) => {
    return axios.post(api + 'user/create', data);
}

export const updateUser = (data) => {
    return axios.post(api + 'user/update', data);
}

export const deleteUser = (data) => {
    return axios.post(api + 'user/delete', data);
}

export const getUser = (data) => {
    return axios.post(api + 'user/get', data);
}

export const login = (data) => {
    return axios.post(api + 'user/login', data);
}
