import { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useLocalFilter } from '@/app/providers/LocalFilterProvider';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { getQueryParams, queryParamsActions } from '@/entities/queryParams';
import { SearchInput } from '@/features/Header/ui/SearchInput/SearchInput';
import { UserProfile } from '@/features/Header/ui/UserProfile/UserProfile';
import { PageLayout } from '@/shared/layouts/PageLayout';
import { AppLogo } from '@/shared/ui/AppLogo';

import styles from './Header.module.scss';
import { SortFilterComponent } from './ui/SortFilterComponent/SortFilterComponent';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className = '' } = props;
    const [_, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { sort, filter } = useSelector(getQueryParams);
    const { setFilter: setFilterPage } = useLocalFilter();

    const [isShowFilters, setIsShowFilters] = useState(false);

    const setSort = useCallback(
        (sort: string) => {
            dispatch(queryParamsActions.setSort(sort));
            setSearchParams(prev => {
                prev.set('sort', `${sort}`);
                return prev;
            });
        },
        [dispatch],
    );

    const setFilter = useCallback(
        (filter: string) => {
            dispatch(queryParamsActions.setFilter(filter));
            setSearchParams(prev => {
                prev.set('filter', `${filter}`);
                prev.set('page', '1');
                return prev;
            });
        },
        [dispatch, filter],
    );

    return (
        <header className={`${styles.Header} ${className}`}>
            <PageLayout>
                <div className={styles.wrapper}>
                    <AppLogo className={styles.logo} />
                    <SearchInput
                        className={styles.search}
                        filter={filter}
                        onSubmit={setFilter}
                        showFilters={() => setIsShowFilters(!isShowFilters)}
                    />
                    <UserProfile userName="Your Name" isAuth={true} />
                </div>
                <SortFilterComponent
                    className={`${styles.filter} ${isShowFilters ? styles.show : styles.hidden}`}
                    sort={sort}
                    onFilterChange={setFilterPage}
                    onSortChange={setSort}
                />
            </PageLayout>
        </header>
    );
};
