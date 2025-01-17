import { postNewCard } from './postNewCard/postNewCard';
import { postSignIn } from './postSignIn/postSignIn';
import { postSignUp } from './postSignUp/postSignUp';
import { protectedResource } from './protectedResource/protectedResource';
import { staticIgnore } from './staticIgnore/staticIgnore';
import { getAllVideosHandler } from './videos/getAllVideos';
import { getVideoByIdHandler } from './videos/getVideoById';

export const handlers = [
    getAllVideosHandler,
    getVideoByIdHandler,
    staticIgnore,
    postSignIn,
    postSignUp,
    protectedResource,
    postNewCard,
];
