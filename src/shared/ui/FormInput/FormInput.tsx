import type { Control, RegisterOptions } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import styles from './FormInput.module.scss';

interface FormInputProps {
    className?: string;
    label: string;
    name: string;
    control: Control<any>;
    rules?: RegisterOptions;
    type?: string;
}

export const FormInput = (props: FormInputProps) => {
    const {
        className = '',
        label,
        control,
        name,
        rules,
        type = 'text',
    } = props;

    return (
        <label className={`${styles.FormInput} ${className}`}>
            {label}
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field, fieldState }) => (
                    <>
                        <input
                            className={styles.input}
                            type={type}
                            {...field}
                        />
                        {fieldState?.error && (
                            <div className={styles.error}>
                                <div className={styles.errorBorder}></div>
                                <span className={styles.errorText}>
                                    {fieldState.error.message}
                                </span>
                            </div>
                        )}
                    </>
                )}
            />
        </label>
    );
};
