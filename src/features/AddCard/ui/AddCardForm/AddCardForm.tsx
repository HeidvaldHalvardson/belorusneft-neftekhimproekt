import { useEffect } from 'react';

import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { addCard } from '@/entities/VideoList';
import type { UserError } from '@/shared/types/userError';
import { Button } from '@/shared/ui/Button';
import { FormInput } from '@/shared/ui/FormInput';

import styles from './AddCardForm.module.scss';

interface FormValues extends FieldValues {
    title: string;
    description: string;
    link: string;
}

interface SingInFormProps {
    onClose: () => void;
}

const youTubePattern = 'https://www.youtube.com/watch?v=';

const AddCardForm = (props: SingInFormProps) => {
    const { onClose = () => {} } = props;

    const [addCardHandler, { data: addCardData, error }] = addCard();
    const messageError = (error as UserError)?.data?.error;

    const { control, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            title: '',
            description: '',
            link: '',
        },
    });

    useEffect(() => {
        if (addCardData && !messageError) {
            onClose();
        }
    }, [addCardData, messageError, onClose]);

    const onSubmitHandler = (data: FormValues) => {
        addCardHandler(data);
    };

    return (
        <form
            className={styles.SingInForm}
            onSubmit={handleSubmit(onSubmitHandler)}
        >
            <FormInput
                label="Title"
                name="title"
                control={control}
                rules={{
                    required: 'Заголовок обязателен',
                    minLength: {
                        value: 10,
                        message:
                            'Заголовок должен содержать минимум 10 символов',
                    },
                }}
            />
            <FormInput
                label="Description"
                name="description"
                control={control}
                rules={{
                    required: 'Описание обязательно',
                    minLength: {
                        value: 10,
                        message:
                            'Описание должно содержать минимум 10 символов',
                    },
                }}
            />
            <FormInput
                label="Link"
                name="link"
                control={control}
                rules={{
                    required: 'Ссылка обязательна',
                    validate: {
                        startsWithYouTube: value => {
                            if (!value.startsWith(youTubePattern)) {
                                return `Ссылка должна быть с YouTube`;
                            }
                            return true;
                        },
                    },
                }}
            />
            {messageError && (
                <span className={styles.errorText}>{messageError}</span>
            )}
            <div className={styles.controls}>
                <Button type="submit">Create card</Button>
            </div>
        </form>
    );
};

export default AddCardForm;
