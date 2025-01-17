import type { StrictRequest } from 'msw';
import { http, HttpResponse } from 'msw';

import type { SignInData } from '@/features/SignIn';
import type { UserType } from '@/shared/types/userType';

import usersData from '../../db/users.json';

export const postSignIn = http.post(
    '/sign-in',
    async ({ request }: { request: StrictRequest<SignInData> }) => {
        const user = await request.json();

        const users: UserType[] = [...usersData.users];

        const foundUser = users.find(item => item.email === user.email);

        if (!foundUser || foundUser.password !== user.password) {
            return HttpResponse.json(
                { error: 'Неверный email или пароль' },
                { status: 401 },
            );
        }

        const { password, token, ...userWithoutTokenAndPassword } = foundUser;

        return HttpResponse.json(
            {
                ...userWithoutTokenAndPassword,
            },
            {
                status: 200,
                headers: { Authorization: `Bearer ${token}` },
            },
        );
    },
);
