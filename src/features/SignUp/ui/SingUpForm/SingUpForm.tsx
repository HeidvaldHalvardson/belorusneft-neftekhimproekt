import { useCallback, useEffect } from 'react';

import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@/app/providers/StoreProvider';
import { authActions } from '@/entities/auth';
import { userActions } from '@/entities/user';
import { signUpUser } from '@/features/SignUp';
import type { UserError } from '@/shared/types/userError';
import type { UserType } from '@/shared/types/userType';
import { Button } from '@/shared/ui/Button';
import { FormInput } from '@/shared/ui/FormInput';

import styles from './SingUpForm.module.scss';

interface FormValues extends FieldValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface SingUpFormProps {
    onClose: () => void;
    changeToSignIn: () => void;
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const SingUpForm = (props: SingUpFormProps) => {
    const { onClose = () => {}, changeToSignIn = () => {} } = props;

    const dispatch = useAppDispatch();

    const [signUp, { data: signInData, error }] = signUpUser();
    const messageError = (error as UserError)?.data?.error;

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
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
        signUp(data);
    };

    return (
        <form
            className={styles.SingInForm}
            onSubmit={handleSubmit(onSubmitHandler)}
        >
            <FormInput
                label="First Name"
                name="firstName"
                control={control}
                rules={{
                    required: 'Имя обязательно',
                    minLength: {
                        value: 2,
                        message: 'Имя должно содержать минимум 2 символов',
                    },
                    maxLength: {
                        value: 10,
                        message: 'Имя не может быть больше 10 символов',
                    },
                }}
            />
            <FormInput
                label="Last Name"
                name="lastName"
                control={control}
                rules={{
                    required: 'Фамилия обязательна',
                    minLength: {
                        value: 2,
                        message: 'Фамилия должна содержать минимум 2 символов',
                    },
                    maxLength: {
                        value: 10,
                        message: 'Фамилия не может быть больше 10 символов',
                    },
                }}
            />
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
                    onClick={changeToSignIn}
                    type="button"
                >
                    Login
                </button>
                <Button type="submit">Registration</Button>
            </div>
        </form>
    );
};

export default SingUpForm;
