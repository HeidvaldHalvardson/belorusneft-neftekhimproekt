import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { SortParams } from '@/entities/VideoList';

import type { QueryParamsSchema } from '../types/QueryParamsSchema';

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
        setPage: (state, action: PayloadAction<number>) => {
            state.params.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.params.limit = action.payload;
        },
        setSort: (state, action: PayloadAction<SortParams>) => {
            state.params.sort = action.payload;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.params.filter = action.payload;
        },
    },
});

export const { actions: queryParamsActions } = queryParamsSlice;
export const { reducer: queryParamsReducer } = queryParamsSlice;
