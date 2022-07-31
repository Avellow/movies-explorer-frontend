import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin, getUserDetails } from './userAction';

const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    isAuth: false,
    userInfo: {},
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
        }
    },
    extraReducers: {
        // login user
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            //state.userInfo = payload
            state.userToken = payload.token
            state.isAuth = true
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },

        // register user
        [registerUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
            console.log(payload)
            state.loading = false
            state.error = payload
        },

        // get user details
        [getUserDetails.pending]: (state) => {
            state.loading = true
        },
        [getUserDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userInfo = payload
        },
        [getUserDetails.rejected]: (state, { payload }) => {
            state.loading = false
        },
    }
})

export const { resetErrorOnUser } = userSlice.actions

export default userSlice.reducer;
