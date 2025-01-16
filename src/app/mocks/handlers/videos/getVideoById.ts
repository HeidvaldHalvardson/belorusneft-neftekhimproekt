import { http, HttpResponse } from 'msw';

import mockData from '../../db/response.json';

export const getVideoByIdHandler = http.get(
    '/videos/:id',
    ({ request, params }) => {
        const { id } = params;

        const items = [...mockData.items];

        const result = items.filter(item => item.id === id);

        return HttpResponse.json(...result);
    },
);
