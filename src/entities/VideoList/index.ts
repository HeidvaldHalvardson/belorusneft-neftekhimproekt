import { SortParams, QueryParams, AddCard } from './types';
import {
    videosApi,
    useGetAllVideosQuery as getAllVideos,
    useGetVideoByIdQuery as getVideoById,
    useAddCardMutation as addCard,
} from './videosApi';

export {
    addCard,
    getAllVideos,
    getVideoById,
    videosApi,
    SortParams,
    QueryParams,
    AddCard,
};
