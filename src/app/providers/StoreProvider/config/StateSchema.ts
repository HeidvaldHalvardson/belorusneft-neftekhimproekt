import type { AuthSchema } from '@/entities/auth';
import type { QueryParamsSchema } from '@/entities/queryParams';
import type { UserSchema } from '@/entities/user';
import type { videosApi } from '@/entities/VideoList';
import type { signInApi } from '@/features/SignIn';
import type { signUpApi } from '@/features/SignUp';

export interface StateSchema {
    [videosApi.reducerPath]: ReturnType<typeof videosApi.reducer>;
    [signInApi.reducerPath]: ReturnType<typeof signInApi.reducer>;
    [signUpApi.reducerPath]: ReturnType<typeof signUpApi.reducer>;
    auth: AuthSchema;
    user: UserSchema;
    queryParams: QueryParamsSchema;
}
