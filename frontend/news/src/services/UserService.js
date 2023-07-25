import axios from './CustomAxios';

const fetchAllUser = (page) => {
    return axios.get(`/user/get-all?page=${page}&limit=5`);
}

const postInsertUser = (InsertUserForm) => {
    return axios.post(`/user/insert`, InsertUserForm);
}

const putUpdateUser = (UpdateUserForm) => {
    return axios.put(`/user/update`, UpdateUserForm);
}

export { fetchAllUser, postInsertUser, putUpdateUser};