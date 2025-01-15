import type { QueryParamsSchema } from '@/entities/queryParams/types/QueryParamsSchema';
import type { videosApi } from '@/entities/VideoList';

export interface StateSchema {
    [videosApi.reducerPath]: ReturnType<typeof videosApi.reducer>;
    queryParams: QueryParamsSchema;
}
