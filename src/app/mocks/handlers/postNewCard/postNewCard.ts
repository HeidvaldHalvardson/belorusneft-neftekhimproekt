import type { StrictRequest } from 'msw';
import { http, HttpResponse } from 'msw';

import type {
    AddCard,
    VideoItem,
    VideoListResponse,
} from '@/entities/VideoList/types';

import mockData from '../../db/response.json';

export const postNewCard = http.post(
    '/add-card',
    async ({ request }: { request: StrictRequest<AddCard> }) => {
        let data: VideoListResponse = mockData;
        const body = await request.json();
        const requestToken = request.headers
            .get('Authorization')
            ?.replace('Bearer ', '');

        if (!requestToken) {
            return HttpResponse.json(
                { error: 'Неавторизован' },
                { status: 401 },
            );
        }

        const newPublishedAt = new Date().toISOString();
        const newId = body.link.replace('https://www.youtube.com/watch?v=', '');

        const newCard: VideoItem = {
            kind: 'youtube#video',
            etag: '"Fznwjl6JEQdo1MGvHOGaz_YanRU/tmmI1yiRrmLWlKikXk1gD3TXsUI"',
            id: `${newId}`,
            snippet: {
                publishedAt: `${newPublishedAt}`,
                channelId: 'UC1234567890abcdefg',
                title: `${body.title}`,
                description: `${body.description}`,
                thumbnails: {
                    default: {
                        url: `https://i.ytimg.com/vi/${newId}/default.jpg`,
                        width: 120,
                        height: 90,
                    },
                    medium: {
                        url: `https://i.ytimg.com/vi/${newId}/mqdefault.jpg`,
                        width: 320,
                        height: 180,
                    },
                    high: {
                        url: `https://i.ytimg.com/vi/${newId}/hqdefault.jpg`,
                        width: 480,
                        height: 360,
                    },
                    standard: {
                        url: `https://i.ytimg.com/vi/${newId}/sddefault.jpg`,
                        width: 640,
                        height: 480,
                    },
                    maxres: {
                        url: `https://i.ytimg.com/vi/${newId}/maxresdefault.jpg`,
                        width: 1280,
                        height: 720,
                    },
                },
            },
            statistics: {
                viewCount: '12345',
                likeCount: '789',
                dislikeCount: '12',
                favoriteCount: '0',
                commentCount: '89',
            },
        };

        data.items.push(newCard);
        data.pageInfo.totalResults = data.items.length;

        return HttpResponse.json(
            {
                ...data,
            },
            {
                status: 200,
                headers: { Authorization: `Bearer ${requestToken}` },
            },
        );
    },
);
