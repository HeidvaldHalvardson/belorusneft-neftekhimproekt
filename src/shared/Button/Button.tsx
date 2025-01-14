import styles from './Button.module.scss';

interface ButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
    const { className = '', children } = props;

    return <div className={`${styles.Button} ${className}`}>{children}</div>;
};
