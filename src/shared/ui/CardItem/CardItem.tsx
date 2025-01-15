import type { VideoItem } from '@/entities/VideoList/types';
import CommentsSVG from '@/shared/assets/card-icons/comments.svg';
import DislikeSVG from '@/shared/assets/card-icons/dislike.svg';
import LikedSVG from '@/shared/assets/card-icons/liked.svg';
import ViewedSVG from '@/shared/assets/card-icons/viewed.svg';
import { Button } from '@/shared/ui/Button';

import styles from './CardItem.module.scss';

interface CardItemProps {
    className?: string;
    item: VideoItem;
}

export const CardItem = (props: CardItemProps) => {
    const { className = '', item } = props;

    const date = new Date(item.snippet.publishedAt);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
    let borderColor = '#2F80ED';

    if (diff > 7 && diff <= 30) {
        borderColor = '#27AE60';
    } else if (diff > 30 && diff <= 180) {
        borderColor = '#F2C94C';
    } else if (diff > 180) {
        borderColor = '#EB5757 ';
    }
    const formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);

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
            <div className={styles.statistics}>
                <div className={styles.statisticsWrapper}>
                    <ViewedSVG />
                    <span className={styles.statisticsCount}>
                        {item.statistics.viewCount}
                    </span>
                </div>
                <div className={styles.statisticsWrapper}>
                    <LikedSVG />
                    <span className={styles.statisticsCount}>
                        {item.statistics.likeCount}
                    </span>
                </div>
                <div className={styles.statisticsWrapper}>
                    <DislikeSVG />
                    <span className={styles.statisticsCount}>
                        {item.statistics.dislikeCount}
                    </span>
                </div>
                <div className={styles.statisticsWrapper}>
                    <CommentsSVG />
                    <span className={styles.statisticsCount}>
                        {item.statistics.commentCount}
                    </span>
                </div>
            </div>
            <h3 className={styles.title}>{item.snippet.title}</h3>
            <span className={styles.date}>{formattedDate}</span>
            <Button className={styles.button}>Далее...</Button>
        </li>
    );
};
