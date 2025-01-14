import React, { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import { routeConfig } from '@/app/providers/router/config/routeConfig';
import { PageLayout } from '@/shared/layouts/PageLayout/PageLayout';

export const AppRouter = () => (
    <PageLayout>
        <Suspense fallback={'Loading'}>
            <Routes>
                {routeConfig.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </Suspense>
    </PageLayout>
);
