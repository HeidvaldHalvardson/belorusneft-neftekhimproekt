import type { ReducersMapObject } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import type { StateSchema } from '@/app/providers/StoreProvider/config/StateSchema';
import { authReducer } from '@/entities/auth';
import { queryParamsReducer } from '@/entities/queryParams';
import { userReducer } from '@/entities/user';
import { videosApi } from '@/entities/VideoList';
import { signInApi } from '@/features/SignIn';
import { signUpApi } from '@/features/SignUp';

export const createReduxStore = () => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        [videosApi.reducerPath]: videosApi.reducer,
        [signInApi.reducerPath]: signInApi.reducer,
        [signUpApi.reducerPath]: signUpApi.reducer,
        auth: authReducer,
        user: userReducer,
        queryParams: queryParamsReducer,
    };

    return configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                videosApi.middleware,
                signInApi.middleware,
                signUpApi.middleware,
            ),
    });
};

export type AppDispatchType = ReturnType<typeof createReduxStore>['dispatch'];
