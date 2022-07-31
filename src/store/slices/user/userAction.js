import {createAsyncThunk} from '@reduxjs/toolkit';
import * as auth from '../../../utils/auth';
import {mainApi} from '../../../utils/constants';

export const registerUser = createAsyncThunk(
    'user/register',
    async({ name, email, password }, { rejectWithValue }) => {
        try {
            await auth.register(name, email, password)
        } catch(error) {
            console.log('ошибочка ' + error)
            // TODO: рефакторинг приходящей ошибки в auth.js (а не только код статуса)
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await auth.authorize(email, password)
            // store user's token in local storage
            localStorage.setItem('userToken', data.token)
            mainApi.setToken(data.token)

            return data
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { getState, rejectWithValue }) => {
        try {
            // get user data from store
            const { user } = getState()

            mainApi.setToken(user.userToken)
            // configure authorization header with user's token

            return await mainApi.getUserInfo()
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const updateUserDetails = createAsyncThunk(
    'user/updateUserDetails',
    async (userInfo, { rejectWithValue }) => {
        try {
            const { name, email } = userInfo
            // вернется объект с именем и email
            return await mainApi.updateUserInfo(name, email)
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)
