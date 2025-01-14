import { useState } from 'react';

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

    const [value, setValue] = useState('');
    const [isShowFilters, setIsShowFilters] = useState(false);

    return (
        <header className={`${styles.Header} ${className}`}>
            <PageLayout>
                <div className={styles.wrapper}>
                    <AppLogo className={styles.logo} />
                    <SearchInput
                        className={styles.search}
                        onSubmit={setValue}
                        showFilters={() => setIsShowFilters(!isShowFilters)}
                    />
                    <UserProfile userName="Your Name" isAuth={true} />
                </div>
                <SortFilterComponent
                    className={`${styles.filter} ${isShowFilters ? styles.show : styles.hidden}`}
                />
            </PageLayout>
        </header>
    );
};
