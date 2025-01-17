import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AuthSchema } from '@/entities/auth';

const token = localStorage.getItem('token') || null;

const initialState: AuthSchema = {
    auth: {
        token,
        isAuth: token !== null,
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<string>) => {
            state.auth.token = action.payload;
            state.auth.isAuth = true;
            localStorage.setItem('token', action.payload);
        },
        clearAuthData: state => {
            state.auth.token = null;
            state.auth.isAuth = false;
            localStorage.removeItem('token');
        },
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
