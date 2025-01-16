import type { VideoStatistics } from '@/entities/VideoList/types';
import CommentsSVG from '@/shared/assets/card-icons/comments.svg';
import DislikeSVG from '@/shared/assets/card-icons/dislike.svg';
import LikedSVG from '@/shared/assets/card-icons/liked.svg';
import ViewedSVG from '@/shared/assets/card-icons/viewed.svg';

import styles from './Statistics.module.scss';

interface StatisticsProps {
    className?: string;
    statistics: VideoStatistics;
}

export const Statistics = (props: StatisticsProps) => {
    const { className = '', statistics } = props;

    return (
        <div className={`${styles.Statistics} ${className}`}>
            <div className={styles.item}>
                <ViewedSVG />
                <span className={styles.count}>{statistics.viewCount}</span>
            </div>
            <div className={styles.item}>
                <LikedSVG />
                <span className={styles.count}>{statistics.likeCount}</span>
            </div>
            <div className={styles.item}>
                <DislikeSVG />
                <span className={styles.count}>{statistics.dislikeCount}</span>
            </div>
            <div className={styles.item}>
                <CommentsSVG />
                <span className={styles.count}>{statistics.commentCount}</span>
            </div>
        </div>
    );
};
