import { Suspense } from 'react';

import { Modal } from '@/shared/ui/Modal';

import { SingUpFormAsync } from '../SingUpForm/SingUpForm.async';

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    changeToSignIn: () => void;
}

export const SignUpModal = (props: SignInModalProps) => {
    const { isOpen, onClose, changeToSignIn } = props;

    return (
        <Modal isOpen={isOpen} title="Registration" onClose={onClose}>
            <Suspense>
                <SingUpFormAsync
                    onClose={onClose}
                    changeToSignIn={changeToSignIn}
                />
            </Suspense>
        </Modal>
    );
};
