import { createSlice } from '@reduxjs/toolkit';

import type { QueryParamsSchema } from '@/entities/queryParams/types/QueryParamsSchema';

const initialState: QueryParamsSchema = {
    params: {
        page: 1,
        limit: 12,
        sort: 'date.asc',
        filter: '',
    },
};

const queryParamsSlice = createSlice({
    name: 'queryParams',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.params.page = action.payload;
        },
        setLimit: (state, action) => {
            state.params.limit = action.payload;
        },
        setSort: (state, action) => {
            state.params.sort = action.payload;
        },
        setFilter: (state, action) => {
            state.params.filter = action.payload;
        },
    },
});

export const { actions: queryParamsActions } = queryParamsSlice;
export const { reducer: queryParamsReducer } = queryParamsSlice;
