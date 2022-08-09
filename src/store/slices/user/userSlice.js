import { createSlice } from '@reduxjs/toolkit';
import {registerUser, userLogin, getUserDetails, updateUserDetails} from './userAction';
import {
    beginLoading,
    onAuthSuccess,
    onRegisterSuccess,
    setRequestError,
    setUserInfo,
    updateUserInfo
} from '../../../utils/constants';

const userToken = localStorage.getItem('userToken')

const initialState = {
    loading: false,
    isAuth: false,
    userInfo: {
        name: null,
        email: null,
    },
    userToken, // jwt
    error: null,
    success: false, // мониторинг процесса регистрации
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetErrorOnUser(state) {
            state.error = null
        },
        resetRegisterSuccessStatus(state) {
            state.success = false
        }
    },
    extraReducers: {
        // login user
        [userLogin.pending]: beginLoading,
        [userLogin.fulfilled]: onAuthSuccess,
        [userLogin.rejected]: setRequestError,

        // register user
        [registerUser.pending]: beginLoading,
        [registerUser.fulfilled]: onRegisterSuccess,
        [registerUser.rejected]: setRequestError,

        // get user details
        [getUserDetails.pending]: beginLoading,
        [getUserDetails.fulfilled]: setUserInfo,
        [getUserDetails.rejected]: setRequestError,

        // update user details
        [updateUserDetails.pending]: beginLoading,
        [updateUserDetails.fulfilled]: updateUserInfo,
        [updateUserDetails.rejected]: setRequestError
    }
})

export const { resetErrorOnUser, resetRegisterSuccessStatus } = userSlice.actions

export default userSlice.reducer;
