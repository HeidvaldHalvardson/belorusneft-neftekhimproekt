import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { SignInData } from '@/features/SignIn';
import type { UserType } from '@/shared/types/userType';

const token: string = localStorage.getItem('token') as string | null;

export const signInApi = createApi({
    reducerPath: 'signInApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: headers => {
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        checkToken: builder.query<UserType, void>({
            query: () => {
                if (!token) return { url: '' };
                return {
                    url: '/protected-resource',
                };
            },
        }),
        signInUser: builder.mutation<UserType, SignInData>({
            query: body => ({
                url: '/sign-in',
                method: 'POST',
                body,
            }),
            transformResponse: (response: any, meta) => {
                const token = meta?.response?.headers
                    ?.get('Authorization')
                    .replace('Bearer ', '');
                return { ...response, token };
            },
        }),
    }),
});

export const { useSignInUserMutation, useCheckTokenQuery } = signInApi;
