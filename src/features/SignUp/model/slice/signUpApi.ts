import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { SignUpData } from '@/features/SignUp';
import type { UserType } from '@/shared/types/userType';

export const signUpApi = createApi({
    reducerPath: 'signUpApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),
    endpoints: builder => ({
        signUpUser: builder.mutation<UserType, SignUpData>({
            query: body => ({
                url: '/sign-up',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useSignUpUserMutation } = signUpApi;
