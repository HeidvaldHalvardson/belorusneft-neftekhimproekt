import Avatar from '@/shared/assets/avatar.svg';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';

import styles from './UserProfile.module.scss';

interface UserProfileProps {
    className?: string;
    isAuth?: boolean;
    userName?: string;
}

export const UserProfile = (props: UserProfileProps) => {
    const { className = '', isAuth = false, userName } = props;

    return (
        <div className={`${styles.UserProfile} ${className}`}>
            {isAuth ? (
                <>
                    <span className={styles.userName}>
                        {userName ? userName : ''}
                    </span>
                    <AppLink to="/profile" className={styles.avatar}>
                        <Avatar />
                    </AppLink>
                    <Button className={styles.button}>Добавить</Button>
                    <Button className={styles.button}>Выйти</Button>
                </>
            ) : (
                <>
                    <Button className={styles.button}>Регистрация</Button>
                    <Button className={styles.button}>Войти</Button>
                </>
            )}
        </div>
    );
};
