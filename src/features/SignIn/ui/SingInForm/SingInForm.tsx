import { useCallback, useEffect } from 'react';

import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@/app/providers/StoreProvider';
import { authActions } from '@/entities/auth';
import { userActions } from '@/entities/user';
import { signInUser } from '@/features/SignIn';
import type { UserError } from '@/shared/types/userError';
import type { UserType } from '@/shared/types/userType';
import { Button } from '@/shared/ui/Button';
import { FormInput } from '@/shared/ui/FormInput';

import styles from './SingInForm.module.scss';

interface FormValues extends FieldValues {
    email: string;
    password: string;
}

interface SingInFormProps {
    onClose: () => void;
    changeToSignUp: () => void;
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SingInForm = (props: SingInFormProps) => {
    const { onClose = () => {}, changeToSignUp = () => {} } = props;

    const dispatch = useAppDispatch();

    const [signIn, { data: signInData, error }] = signInUser();
    const messageError = (error as UserError)?.data?.error;

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const setToken = useCallback(
        (token: string) => {
            dispatch(authActions.setAuthData(token));
        },
        [dispatch],
    );

    const setUser = useCallback(
        (user: UserType) => {
            dispatch(userActions.setUser(user));
        },
        [dispatch],
    );

    useEffect(() => {
        if (signInData && !messageError) {
            const { token, ...userWithoutToken } = signInData;
            setToken(token);
            setUser(userWithoutToken);
            onClose();
        }
    }, [messageError, onClose, setToken, setUser, signInData]);

    const onSubmitHandler = (data: FormValues) => {
        signIn(data);
    };

    return (
        <form
            className={styles.SingInForm}
            onSubmit={handleSubmit(onSubmitHandler)}
        >
            <FormInput
                label="email"
                name="email"
                control={control}
                rules={{
                    required: 'Email обязателен',
                    pattern: {
                        value: emailPattern,
                        message: 'Некоректный формат email',
                    },
                }}
            />
            <FormInput
                label="password"
                name="password"
                type="password"
                control={control}
                rules={{
                    required: 'Пароль обязателен',
                    minLength: {
                        value: 8,
                        message: 'Пароль должен содержать минимум 8 символов',
                    },
                }}
            />
            {messageError && (
                <span className={styles.errorText}>{messageError}</span>
            )}
            <div className={styles.controls}>
                <button
                    className={styles.changeToSignUp}
                    onClick={changeToSignUp}
                    type="button"
                >
                    Registration
                </button>
                <Button type="submit">Login</Button>
            </div>
        </form>
    );
};

export default SingInForm;
