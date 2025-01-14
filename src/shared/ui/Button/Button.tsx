import type { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

type ButtonTheme = 'primary' | 'search' | 'clear';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: React.ReactNode;
    theme?: ButtonTheme;
}

export const Button = (props: ButtonProps) => {
    const {
        className = '',
        children,
        theme = 'primary',
        ...otherProps
    } = props;

    return (
        <button
            className={`${styles.Button} ${styles[theme]} ${className}`}
            {...otherProps}
        >
            {children}
        </button>
    );
};
