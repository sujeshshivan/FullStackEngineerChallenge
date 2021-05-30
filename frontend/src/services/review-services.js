import axios from 'axios';
const api = 'http://localhost:3000/api/v1/';

export const getReviewList = (data) => {
    return axios.post(api + 'review/list', data);
}

// export const createReview = (data) => {
//     return axios.post(api + 'review/create', data);
// }

// export const updateReview = (data) => {
//     return axios.post(api + 'review/update', data);
// }

export const deleteReview = (data) => {
    return axios.post(api + 'review/delete', data);
}

export const getReview = (data) => {
    return axios.post(api + 'review/get', data);
}