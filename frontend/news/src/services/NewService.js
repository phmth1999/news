import axios from './CustomAxios';

const getAllNew = (page) => {
    return axios.get(`/new/get-all?page=${page}&limit=3`);
}

const getNewById = (id) => {
    return axios.get(`/new/${id}`);
}

const postInsertNew = (InsertNewForm) => {
    return axios.post(`/new/insert`, InsertNewForm);
}

const putUpdateNew = (UpdateNewForm) => {
    return axios.put(`/new/update`, UpdateNewForm);
}

export { getAllNew, postInsertNew, putUpdateNew, getNewById};