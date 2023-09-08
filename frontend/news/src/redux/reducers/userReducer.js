import { 
    FETCH_USER_LOGIN, 
    FETCH_USER_ERROR, 
    FETCH_USER_SUCCESS, 
    USER_LOGOUT, 
    USER_REFRESH 
} from '../actions/userAction';

const INITIAL_STATE = {
    account: {
        username: 'abc',
        auth: null ,
        token: ""
    },
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN:
            return {
                ...state,
            };
        case FETCH_USER_ERROR:
            console.log(">> check action: ", action);
            return {
                ...state,
                account: {
                    auth: null,
                },
            };
        case FETCH_USER_SUCCESS:
            console.log(">> check action: ", action);
            return {
                ...state,
                account: {
                    username: action.data.username,
                    token: action.data.token,
                    auth: true
                },
            };
        case USER_LOGOUT:
            console.log(">> check action: ", action);
            return {
                ...state,
                account: {
                    username: '',
                    token: '',
                    auth: false
                },
            };
        case USER_REFRESH:
            console.log(">> check action: ", action);
            return {
                ...state,
                account: {
                    username: localStorage.getItem('username'),
                    token: localStorage.getItem('token'),
                    auth: true
                },
            };
        default: return state;
    }

};

export default userReducer;