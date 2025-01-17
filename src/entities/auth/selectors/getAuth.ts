import type { StateSchema } from '@/app/providers/StoreProvider';

export const getAuth = (state: StateSchema) => state.auth.auth;
