import {createAsyncThunk} from '@reduxjs/toolkit';
import * as auth from '../../../utils/auth';
import {errorHandlerOnAsyncThunk, mainApi} from '../../../utils/constants';

export const registerUser = createAsyncThunk(
    'user/register',
    async({ name, email, password }, { rejectWithValue }) => {
        try {
            await auth.register(name, email, password)
        } catch (error) {
            return errorHandlerOnAsyncThunk(error, rejectWithValue)
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
            return errorHandlerOnAsyncThunk(error, rejectWithValue)
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

            return await mainApi.getUserInfo()
        } catch (error) {
            return errorHandlerOnAsyncThunk(error, rejectWithValue)
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
            return errorHandlerOnAsyncThunk(error, rejectWithValue)
        }
    }
)
