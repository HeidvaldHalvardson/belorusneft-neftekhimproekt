import { staticIgnore } from './staticIgnore/staticIgnore';
import { getAllVideosHandler } from './videos/getAllVideos';

export const handlers = [getAllVideosHandler, staticIgnore];
