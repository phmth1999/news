import { loginApi, logoutApi } from '../../services/UserService';

export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";

export const FETCH_USER_ERROR = "FETCH_USER_ERROR";

export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const USER_LOGOUT = "USER_LOGOUT";

export const USER_REFRESH = "USER_REFRESH";

export const handleLoginRedux = (username, password) => {
    return async (dispatch, getState) => {
        dispatch({type: FETCH_USER_LOGIN});

        try {
            let res = await loginApi(username, password);
            if(res && res.token){
                localStorage.setItem('token', res.token);
                localStorage.setItem('username', username);
                dispatch({
                    type: FETCH_USER_SUCCESS, 
                    data: {username, token: res.token}
                });
            }else{
                dispatch({type: FETCH_USER_ERROR});
            }
        } catch (error) {
            dispatch({type: FETCH_USER_ERROR});
        }
        
    };
};

export const handleLogoutRedux = () => {
    return async (dispatch, getState) => {
        dispatch({type: USER_LOGOUT});
        await logoutApi();
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }
}

export const handleRefresh = () => {
    return  (dispatch, getState) => {
        dispatch({type: USER_REFRESH});
    }
}