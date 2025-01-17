import { Suspense } from 'react';

import { SingInFormAsync } from '@/features/SignIn/ui/SingInForm/SingInForm.async';
import { Modal } from '@/shared/ui/Modal';

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    changeToSignUp: () => void;
}

export const SignInModal = (props: SignInModalProps) => {
    const { isOpen, onClose, changeToSignUp } = props;

    return (
        <Modal isOpen={isOpen} title="Login" onClose={onClose}>
            <Suspense>
                <SingInFormAsync
                    onClose={onClose}
                    changeToSignUp={changeToSignUp}
                />
            </Suspense>
        </Modal>
    );
};
