import styles from './PageLayout.module.scss';

interface PageLayoutProps {
    children?: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    return <div className={styles.PageLayout}>{children}</div>;
};
