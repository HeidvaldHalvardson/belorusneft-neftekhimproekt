import type { VideoItem } from '@/entities/VideoList/types';
import { CardItem } from '@/shared/ui/CardItem';

import styles from './CardList.module.scss';

interface CardListProps {
    className?: string;
    items: VideoItem[];
}

export const CardList = (props: CardListProps) => {
    const { className = '', items } = props;

    return (
        <ul className={`${styles.CardList} ${className}`}>
            {items.map(item => (
                <CardItem key={item.id} item={item} />
            ))}
        </ul>
    );
};
