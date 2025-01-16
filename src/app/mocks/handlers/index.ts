import { getVideoByIdHandler } from '@/app/mocks/handlers/videos/getVideoById';

import { staticIgnore } from './staticIgnore/staticIgnore';
import { getAllVideosHandler } from './videos/getAllVideos';

export const handlers = [
    getAllVideosHandler,
    getVideoByIdHandler,
    staticIgnore,
];
