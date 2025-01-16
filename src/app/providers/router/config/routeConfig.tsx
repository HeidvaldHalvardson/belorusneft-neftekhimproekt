import type { RouteProps } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { ErrorPage } from '@/pages/ErrorPage';
import { MainPage } from '@/pages/MainPage';
import VideoPage from '@/pages/VideoPage/ui/VideoPage';

export enum AppRoutes {
    MAIN = 'main',
    VIDEOS = 'videos',
    VIDEO = 'video',
    NOT_FOUND = 'not-found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.VIDEOS]: '/videos',
    [AppRoutes.VIDEO]: '/videos/:id',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: RouteProps[] = [
    {
        path: RoutePath[AppRoutes.MAIN],
        element: <Navigate to={RoutePath[AppRoutes.VIDEOS]} />,
    },
    {
        path: RoutePath[AppRoutes.VIDEOS],
        element: <MainPage />,
    },
    {
        path: RoutePath[AppRoutes.VIDEO],
        element: <VideoPage />,
    },
    {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <ErrorPage />,
    },
];
