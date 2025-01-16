import styles from './ModalCreateCard.module.scss';

interface ModalCreateCardProps {
    className?: string;
}

export const ModalCreateCard = (props: ModalCreateCardProps) => {
    const { className = '' } = props;

    return <div className={`${styles.ModalCreateCard} ${className}`}></div>;
};
