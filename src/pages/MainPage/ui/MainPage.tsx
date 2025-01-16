import { useCallback, useEffect, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useLocalFilter } from '@/app/providers/LocalFilterProvider';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { getQueryParams, queryParamsActions } from '@/entities/queryParams';
import { getAllVideos } from '@/entities/VideoList';
import { CardList } from '@/shared/ui/CardList';
import type { PageSize } from '@/shared/ui/Pagination';
import { Pagination } from '@/shared/ui/Pagination';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { page, limit, sort, filter } = useSelector(getQueryParams);
    const { filter: filterPage } = useLocalFilter();

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

    const limitHandler = (size: number) => {
        setSearchParams(prev => {
            prev.set('limit', `${size}`);
            return prev;
        });
    };

    const filteredPageItems = useMemo(() => {
        return filterPage
            ? videosList?.items.filter(item => {
                  return item.snippet.title
                      .toLowerCase()
                      .includes(filterPage.toLowerCase());
              })
            : videosList?.items;
    }, [filterPage, videosList]);

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>Что-то пошло не так...</div>}
            {filteredPageItems && filteredPageItems.length > 0 ? (
                <>
                    <CardList items={filteredPageItems} />
                </>
            ) : (
                <div>Ничего не найдено</div>
            )}
            <Pagination
                total={videosList?.pageInfo.totalResults}
                current={page}
                onChangePage={pageHandler}
                onChangeSize={limitHandler}
                pageSize={limit as PageSize}
            />
        </>
    );
};

export default MainPage;
