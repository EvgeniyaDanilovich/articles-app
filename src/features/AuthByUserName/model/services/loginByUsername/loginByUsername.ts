import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import i18n from 'shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', authData);

            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(userActions.setAuthData(response.data));
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));

            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(i18n.t('Wrong name or password'));
        }
    },
);
