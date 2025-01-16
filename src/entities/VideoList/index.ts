import { SortParams, QueryParams } from './types';
import {
    videosApi,
    useGetAllVideosQuery as getAllVideos,
    useGetVideoByIdQuery as getVideoById,
} from './videosApi';

export { getAllVideos, getVideoById, videosApi, SortParams, QueryParams };
