import { Link } from 'react-router-dom';

import NotFoundSVG from '@/shared/assets/not-found.svg';

import styles from './ErrorPage.module.scss';

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage = (props: ErrorPageProps) => {
    const { className = '' } = props;

    return (
        <div className={`${styles.ErrorPage} ${className}`}>
            <NotFoundSVG />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Что-то пошло не так...</h1>
                <Link to={'/'} className={styles.link}>
                    Вернуться на главную
                </Link>
            </div>
        </div>
    );
};
