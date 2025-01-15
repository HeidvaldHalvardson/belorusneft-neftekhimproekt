import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { QueryParams, VideoListResponse } from './types';

export const videosApi = createApi({
    reducerPath: 'videosApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: builder => ({
        getAllVideos: builder.query<VideoListResponse, QueryParams>({
            query: ({ page, limit, sort, filter }) => {
                return {
                    url: `videos?limit=${limit}&page=${page}&sort=${sort}&filter=${filter}`,
                };
            },
        }),
    }),
});

export const { useGetAllVideosQuery } = videosApi;
