import type { RouteProps } from 'react-router-dom';

import { MainPage } from '@/pages/MainPage';

export enum AppRoutes {
    MAIN = 'main',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
};

export const routeConfig: RouteProps[] = [
    {
        path: RoutePath[AppRoutes.MAIN],
        element: <MainPage />,
    },
];
