import { useCallback, useEffect } from 'react';

import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@/app/providers/StoreProvider';
import { getQueryParams, queryParamsActions } from '@/entities/queryParams';
import { getAllVideos } from '@/entities/VideoList';
import { CardList } from '@/shared/ui/CardList';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, limit, sort, filter } = useSelector(getQueryParams);

    const {
        data: videosList,
        error,
        isLoading,
    } = getAllVideos({ page, limit, sort, filter });

    const setPage = useCallback(
        (page: number) => {
            dispatch(queryParamsActions.setPage(page));
        },
        [dispatch],
    );

    const setLimit = useCallback(
        (limit: number) => {
            dispatch(queryParamsActions.setLimit(limit));
        },
        [dispatch],
    );

    const setSort = useCallback(
        (sort: string) => {
            dispatch(queryParamsActions.setSort(sort));
        },
        [dispatch],
    );

    const setFilter = useCallback(
        (filter: string) => {
            dispatch(queryParamsActions.setFilter(filter));
        },
        [dispatch],
    );

    useEffect(() => {
        const queryPage = searchParams.get('page');
        const queryLimit = searchParams.get('limit');
        const querySort = searchParams.get('sort');
        const queryFilter = searchParams.get('filter');

        if (queryPage) setPage(+queryPage);
        if (queryLimit) setLimit(+queryLimit);
        if (querySort) setSort(querySort);
        if (queryFilter) setFilter(queryFilter);
    }, [
        location.search,
        dispatch,
        searchParams,
        setPage,
        setLimit,
        setSort,
        setFilter,
    ]);

    const pageHandler = (newPage: number) => {
        setSearchParams(prev => {
            prev.set('page', `${newPage}`);
            return prev;
        });
    };

    const limitHandler = (current: number, size: number) => {
        setSearchParams(prev => {
            prev.set('limit', `${size}`);
            return prev;
        });
    };

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Что-то пошло не так...</div>}
            {videosList?.items && <CardList items={videosList.items} />}
            <Pagination
                align="center"
                total={videosList?.pageInfo.totalResults}
                current={page}
                onChange={pageHandler}
                pageSize={limit}
                showSizeChanger
                onShowSizeChange={limitHandler}
                pageSizeOptions={[12, 20, 32, 56]}
            />
        </div>
    );
};

export default MainPage;
