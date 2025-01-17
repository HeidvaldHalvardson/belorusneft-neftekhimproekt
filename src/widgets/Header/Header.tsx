import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { useLocalFilter } from '@/app/providers/LocalFilterProvider';
import { useAppDispatch } from '@/app/providers/StoreProvider';
import { authActions, getAuth } from '@/entities/auth';
import { getQueryParams, queryParamsActions } from '@/entities/queryParams';
import { getUser, userActions } from '@/entities/user';
import type { SortParams } from '@/entities/VideoList';
import { AddCardModal } from '@/features/AddCard';
import { checkToken, SignInModal } from '@/features/SignIn';
import { SignUpModal } from '@/features/SignUp/ui/SignUpModal/SignUpModal';
import SingUpForm from '@/features/SignUp/ui/SingUpForm/SingUpForm';
import { PageLayout } from '@/shared/layouts/PageLayout';
import type { UserError } from '@/shared/types/userError';
import type { UserType } from '@/shared/types/userType';
import { AppLogo } from '@/shared/ui/AppLogo';

import styles from './Header.module.scss';
import { SearchInput } from './ui/SearchInput/SearchInput';
import { SortFilterComponent } from './ui/SortFilterComponent/SortFilterComponent';
import { UserProfile } from './ui/UserProfile/UserProfile';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className = '' } = props;

    const [modalSignInOpen, setModalSignInOpen] = useState(false);
    const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
    const [modalAddCardOpen, setModalAddCardOpen] = useState(false);
    const [, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    const { sort, filter } = useSelector(getQueryParams);
    const { isAuth } = useSelector(getAuth);
    const user = useSelector(getUser);
    const { setFilter: setFilterPage } = useLocalFilter();
    const [isShowFilters, setIsShowFilters] = useState(false);

    const { data: userData, error } = checkToken();
    const messageError = (error as UserError)?.data?.error;

    const setSort = useCallback(
        (sort: SortParams) => {
            dispatch(queryParamsActions.setSort(sort));
            setSearchParams(prev => {
                prev.set('sort', `${sort}`);
                return prev;
            });
        },
        [dispatch, setSearchParams],
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
        [dispatch, setSearchParams],
    );

    const setUser = useCallback(
        (user: UserType) => {
            dispatch(userActions.setUser(user));
        },
        [dispatch],
    );

    const signOut = useCallback(() => {
        dispatch(authActions.clearAuthData());
        dispatch(userActions.clearUser());
    }, [dispatch]);

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }

        if (messageError) {
            setUser(null);
            signOut();
        }
    }, [messageError, setUser, signOut, userData]);

    const userName = useMemo(() => {
        return `${user?.firstName} ${user?.lastName}`;
    }, [user?.firstName, user?.lastName]);

    const changeToSignUp = () => {
        setModalSignInOpen(false);
        setModalSignUpOpen(true);
    };

    const changeToSignIn = () => {
        setModalSignUpOpen(false);
        setModalSignInOpen(true);
    };

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
                    <UserProfile
                        userName={userName}
                        isAuth={isAuth}
                        signOut={signOut}
                        signIn={() => setModalSignInOpen(true)}
                        signUp={() => setModalSignUpOpen(true)}
                        addCard={() => setModalAddCardOpen(true)}
                    />
                </div>
                <SortFilterComponent
                    className={`${styles.filter} ${isShowFilters ? styles.show : styles.hidden}`}
                    sort={sort}
                    onFilterChange={setFilterPage}
                    onSortChange={setSort}
                />
            </PageLayout>
            <SignInModal
                isOpen={modalSignInOpen}
                onClose={() => setModalSignInOpen(false)}
                changeToSignUp={changeToSignUp}
            />
            <SignUpModal
                isOpen={modalSignUpOpen}
                onClose={() => setModalSignUpOpen(false)}
                changeToSignIn={changeToSignIn}
            />
            <AddCardModal
                isOpen={modalAddCardOpen}
                onClose={() => setModalAddCardOpen(false)}
            />
        </header>
    );
};
