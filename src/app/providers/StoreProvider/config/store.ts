import type { ReducersMapObject } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import type { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { queryParamsReducer } from '@/entities/queryParams';
import { videosApi } from '@/entities/VideoList';

export const createReduxStore = () => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        [videosApi.reducerPath]: videosApi.reducer,
        queryParams: queryParamsReducer,
    };

    return configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(videosApi.middleware),
    });
};

export type AppDispatchType = ReturnType<typeof createReduxStore>['dispatch'];
