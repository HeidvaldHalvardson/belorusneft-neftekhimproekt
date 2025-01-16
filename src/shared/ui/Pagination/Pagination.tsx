import type { ChangeEvent } from 'react';

import styles from './Pagination.module.scss';

export type PageSize = 12 | 20 | 32 | 56;

interface PaginationProps {
    className?: string;
    total?: number;
    current?: number;
    pageSize?: PageSize;
    onChangePage?: (value: number) => void;
    onChangeSize?: (value: number) => void;
}

export const Pagination = (props: PaginationProps) => {
    const {
        className = '',
        total = 0,
        current = 1,
        pageSize = 12,
        onChangePage = () => {},
        onChangeSize = () => {},
    } = props;

    const length = Math.ceil(total / pageSize);
    const left = current === 1 ? null : current - 1;
    const right = current === length ? null : current + 1;

    const createButtons = () => {
        let buttons = [];

        if (length === 1) return [1];

        buttons.push(1);

        if (left && left > 2) buttons.push(null);

        for (
            let center = Math.max(2, left);
            center <= Math.min(length - 1, right);
            center++
        ) {
            buttons.push(center);
        }

        if (right && right < length - 1) buttons.push(null);

        if (current === length && length > 2) {
            buttons.push(length - 1);
        }

        if (length > 1) buttons.push(length);

        return buttons;
    };

    const onChangeSizeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const size = +e.target.value as PageSize;
        onChangeSize(size);
        onChangePage(1);
    };

    const buttons = createButtons();

    const pageSizeOptions: PageSize[] = [12, 20, 32, 56];

    return (
        <div className={`${styles.Pagination} ${className}`}>
            <ul className={styles.list}>
                {buttons.map(item =>
                    item ? (
                        <li
                            key={item}
                            className={`${styles.button} ${item === current ? styles.current : ''}`}
                            onClick={() => onChangePage(item)}
                        >
                            {item}
                        </li>
                    ) : (
                        <li key={item} className={styles.dots}>
                            ...
                        </li>
                    ),
                )}
            </ul>
            <select
                className={styles.select}
                value={pageSize}
                onChange={onChangeSizeHandler}
            >
                {pageSizeOptions.map(size => (
                    <option key={size} value={size}>
                        {size} / page
                    </option>
                ))}
            </select>
        </div>
    );
};
