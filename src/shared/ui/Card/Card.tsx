import { useLocation, useNavigate } from 'react-router-dom';

import type { VideoItem } from '@/entities/VideoList/types';
import BackArrow from '@/shared/assets/back-arrow.svg';
import { formattedDate } from '@/shared/lib/formattedDate';
import { setBoderColor } from '@/shared/lib/setBoderColor';
import { Button } from '@/shared/ui/Button';
import { Statistics } from '@/shared/ui/Statistics';

import styles from './Card.module.scss';

interface CardProps {
    className?: string;
    item: VideoItem;
}

export const Card = (props: CardProps) => {
    const { className = '', item } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const date = formattedDate(item.snippet.publishedAt);

    const borderColor = setBoderColor(item.snippet.publishedAt);

    const onBackHandler = () => {
        const from = location?.state?.from || '/';
        navigate(from);
    };

    return (
        <div className={`${styles.Card} ${className}`}>
            <Button
                onClick={onBackHandler}
                className={styles.button}
                theme="clear"
            >
                <BackArrow />
                <span className={styles.buttonText}>Назад</span>
            </Button>
            <div className={styles.wrapper}>
                <iframe
                    className={styles.video}
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${item.id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write;
                    encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                <div
                    className={styles.inner}
                    style={{ borderBottom: `4px solid ${borderColor}` }}
                >
                    <div className={styles.header}>
                        <h1 className={styles.title}>{item.snippet.title}</h1>
                        <span className={styles.date}>{date}</span>
                    </div>
                    <h2 className={styles.descTitle}>Описание:</h2>
                    <p className={styles.descText}>
                        {item.snippet.description}
                    </p>
                    <Statistics
                        className={styles.statistics}
                        statistics={item.statistics}
                    />
                </div>
            </div>
        </div>
    );
};
