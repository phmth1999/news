import axios from './CustomAxios';

const fetchAllUser = (page) => {
    return axios.get(`/user/get-all?page=${page}&limit=2`);
}

const postSignup = (SignupForm) => {
    return axios.post(`/auth/sign-up`,SignupForm);
}

export { fetchAllUser, postSignup};