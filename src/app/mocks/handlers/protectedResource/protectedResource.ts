import { http, HttpResponse } from 'msw';

import usersData from '@/app/mocks/db/users.json';
import type { UserType } from '@/shared/types/userType';

export const protectedResource = http.get(
    '/protected-resource',
    ({ request }) => {
        const users: UserType[] = [...usersData.users];
        const requestToken = request.headers
            .get('Authorization')
            ?.replace('Bearer ', '');

        if (!requestToken) {
            return HttpResponse.json(
                { error: 'Неавторизован' },
                { status: 401 },
            );
        }

        const foundUser = users.find(item => item.token === requestToken);

        if (!foundUser) {
            return HttpResponse.json(
                { error: 'Неавторизован' },
                { status: 401 },
            );
        }

        const { password, token, ...userWithoutTokenAndPassword } = foundUser;

        return HttpResponse.json(
            { ...userWithoutTokenAndPassword },
            {
                status: 200,
                headers: { Authorization: `Bearer ${token}` },
            },
        );
    },
);
