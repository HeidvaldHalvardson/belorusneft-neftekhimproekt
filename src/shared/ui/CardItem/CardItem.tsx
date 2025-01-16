import { useLocation, useNavigate } from 'react-router-dom';

import type { VideoItem } from '@/entities/VideoList/types';
import { setBoderColor } from '@/shared/lib/setBoderColor';
import { Button } from '@/shared/ui/Button';
import { Statistics } from '@/shared/ui/Statistics';

import styles from './CardItem.module.scss';

interface CardItemProps {
    className?: string;
    item: VideoItem;
}

export const CardItem = (props: CardItemProps) => {
    const { className = '', item } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const date = new Date(item.snippet.publishedAt);
    const borderColor = setBoderColor(item.snippet.publishedAt);
    const formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);

    const handleClick = () => {
        navigate(`/videos/${item.id}`, { state: { from: location } });
    };

    return (
        <li
            className={`${styles.CardItem} ${className}`}
            style={{ borderBottom: `4px solid ${borderColor}` }}
        >
            <img
                className={styles.image}
                src={item.snippet.thumbnails.maxres.url}
                width={223}
                height={123}
                alt={`Изображение ${item.snippet.title}`}
            />
            <Statistics
                className={styles.statistics}
                statistics={item.statistics}
            />
            <h3 className={styles.title}>{item.snippet.title}</h3>
            <span className={styles.date}>{formattedDate}</span>
            <Button className={styles.button} onClick={handleClick}>
                Далее...
            </Button>
        </li>
    );
};
