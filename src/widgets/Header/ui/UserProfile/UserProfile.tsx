import Avatar from '@/shared/assets/avatar.svg';
import { AppLink } from '@/shared/ui/AppLink';
import { Button } from '@/shared/ui/Button';

import styles from './UserProfile.module.scss';

interface UserProfileProps {
    className?: string;
    isAuth?: boolean;
    userName?: string;
    signOut?: () => void;
    signIn?: () => void;
    signUp?: () => void;
    addCard?: () => void;
}

export const UserProfile = (props: UserProfileProps) => {
    const {
        className = '',
        isAuth = false,
        userName,
        signOut,
        signIn,
        signUp,
        addCard,
    } = props;

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
                    <Button className={styles.button} onClick={addCard}>
                        Добавить
                    </Button>
                    <Button className={styles.button} onClick={signOut}>
                        Выйти
                    </Button>
                </>
            ) : (
                <>
                    <Button className={styles.button} onClick={signUp}>
                        Регистрация
                    </Button>
                    <Button className={styles.button} onClick={signIn}>
                        Войти
                    </Button>
                </>
            )}
        </div>
    );
};
