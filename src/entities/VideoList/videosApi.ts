import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    AddCard,
    QueryParams,
    VideoItem,
    VideoListResponse,
} from './types';

const token: string = localStorage.getItem('token') as string | null;

export const videosApi = createApi({
    reducerPath: 'videosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: headers => {
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Videos'],
    endpoints: builder => ({
        getAllVideos: builder.query<VideoListResponse, QueryParams>({
            query: ({ page, limit, sort, filter }) => {
                return {
                    url: `videos?limit=${limit}&page=${page}&sort=${sort}&filter=${filter}`,
                };
            },
            providesTags: ['Videos'],
        }),
        getVideoById: builder.query<VideoItem, string>({
            query: (id: string) => {
                return {
                    url: `videos/${id}`,
                };
            },
        }),
        addCard: builder.mutation<VideoListResponse, AddCard>({
            query: body => ({
                url: '/add-card',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Videos'],
        }),
    }),
});

export const {
    useGetAllVideosQuery,
    useGetVideoByIdQuery,
    useAddCardMutation,
} = videosApi;
