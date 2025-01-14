import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';

import styles from './AppLink.module.scss';

export enum AppLinkTheme {
    CLEAR = 'clear',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    to: string;
    theme?: AppLinkTheme;
    children?: React.ReactNode;
}

export const AppLink = (props: AppLinkProps) => {
    const { className = '', to, children, theme = AppLinkTheme.CLEAR } = props;

    return (
        <Link
            to={to}
            className={`${styles.AppLink} ${styles[theme]} ${className}`}
        >
            {children}
        </Link>
    );
};
