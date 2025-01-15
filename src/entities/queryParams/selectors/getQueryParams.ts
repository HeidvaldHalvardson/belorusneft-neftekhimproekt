import type { StateSchema } from '@/app/providers/StoreProvider';

export const getQueryParams = (state: StateSchema) => state.queryParams.params;
