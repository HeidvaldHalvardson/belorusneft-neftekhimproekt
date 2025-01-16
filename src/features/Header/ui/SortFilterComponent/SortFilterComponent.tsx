import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import type { SortParams } from '@/entities/VideoList';

import styles from './SortFilterComponent.module.scss';

interface SortFilterComponentProps {
    className?: string;
    sort?: SortParams;
    onSortChange?: (value: SortParams) => void;
    onFilterChange?: (value: string) => void;
}

export const SortFilterComponent = (props: SortFilterComponentProps) => {
    const {
        className = '',
        sort = 'date.asc',
        onSortChange = () => {},
        onFilterChange = () => {},
    } = props;

    const [filterValue, setFilterValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            onFilterChange(filterValue);
        }, 500);

        return () => clearTimeout(timer);
    }, [filterValue, onFilterChange]);

    const onFilterChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterValue(e.target.value);
    };

    const sortByDateHandler = () => {
        if (sort.startsWith('views')) {
            onSortChange('date.asc');
        } else {
            const newSort = sort === 'date.asc' ? 'date.desc' : 'date.asc';
            onSortChange(newSort);
        }
    };

    const sortByViewsHandler = () => {
        if (sort.startsWith('date')) {
            onSortChange('views.asc');
        } else {
            const newSort = sort === 'views.asc' ? 'views.desc' : 'views.asc';
            onSortChange(newSort);
        }
    };

    const onClearHandler = () => {
        onSortChange('date.asc');
        setFilterValue('');
        onFilterChange('');
    };

    return (
        <div className={`${styles.SortFilterComponent} ${className}`}>
            <div className={styles.sortWrapper}>
                <span className={styles.sortText}>Сортировать:</span>
                <div>
                    <button
                        className={styles.activeText}
                        onClick={sortByDateHandler}
                    >
                        по дате
                    </button>
                    <button
                        className={styles.activeText}
                        onClick={sortByViewsHandler}
                    >
                        по просмотрам
                    </button>
                </div>
            </div>
            <label className={styles.label}>
                <span className={styles.labelText}>фильтровать по слову:</span>
                <input
                    className={styles.input}
                    type="text"
                    value={filterValue}
                    onChange={onFilterChangeHandler}
                />
            </label>
            <button onClick={onClearHandler}>
                <span className={styles.clear}>сбросить</span>
            </button>
        </div>
    );
};
