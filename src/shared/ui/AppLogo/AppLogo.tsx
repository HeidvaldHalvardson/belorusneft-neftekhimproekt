import Logo from '@/shared/assets/logo.svg';
import { AppLink } from '@/shared/ui/AppLink';

import styles from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
}

export const AppLogo = (props: AppLogoProps) => {
    const { className = '' } = props;

    return (
        <AppLink to="/" className={`${styles.AppLogo} ${className}`}>
            <Logo />
        </AppLink>
    );
};
