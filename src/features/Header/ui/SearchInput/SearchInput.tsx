import type { ChangeEvent, FormEventHandler } from 'react';
import { useState } from 'react';

import FilterSVG from '@/shared/assets/filter.svg';
import { Button } from '@/shared/ui/Button';

import styles from './SearchInput.module.scss';

interface SearchInputProps {
    className?: string;
    onSubmit: (value: string) => void;
    showFilters?: () => void;
    filter: string;
}

export const SearchInput = (props: SearchInputProps) => {
    const { className = '', onSubmit, showFilters = () => {}, filter } = props;

    const [value, setValue] = useState(filter);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        onSubmit(value);
    };

    return (
        <form
            className={`${styles.SearchInput} ${className}`}
            onSubmit={onSubmitHandler}
        >
            <input
                className={styles.input}
                type="text"
                onChange={onChangeHandler}
                placeholder="Что бы ты хотел посмотреть?"
            />
            <Button className={styles.button} theme="search" type="submit">
                Искать
            </Button>
            <Button
                className={styles.filterButton}
                theme="clear"
                onClick={showFilters}
                type="button"
            >
                <FilterSVG />
            </Button>
        </form>
    );
};
