import type { StrictRequest } from 'msw';
import { http, HttpResponse } from 'msw';

import type { SignUpData } from '@/features/SignUp';
import type { UserType } from '@/shared/types/userType';

import usersData from '../../db/users.json';

export const postSignUp = http.post(
    '/sign-up',
    async ({ request }: { request: StrictRequest<SignUpData> }) => {
        const user = await request.json();

        const users: UserType[] = [...usersData.users];

        const foundUser = users.find(item => item.email === user.email);

        if (foundUser) {
            return HttpResponse.json(
                {
                    error: 'Пользователь с таким email существует',
                },
                { status: 409 },
            );
        }

        const newId =
            new Date().getTime() + Math.floor(Math.random() * 1000).toString();
        const newToken = `token${newId}`;

        const newUser: UserType = {
            id: newId,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            token: newToken,
        };

        users.push(newUser);
        console.log(users);

        const { password, token, ...userWithoutTokenAndPassword } = newUser;

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
