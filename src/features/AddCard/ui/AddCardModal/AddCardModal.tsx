import { Suspense } from 'react';

import { Modal } from '@/shared/ui/Modal';

import { AddCardFormAsync } from '../AddCardForm/AddCardForm.async';

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddCardModal = (props: SignInModalProps) => {
    const { isOpen, onClose } = props;

    return (
        <Modal isOpen={isOpen} title="Create new card" onClose={onClose}>
            <Suspense>
                <AddCardFormAsync onClose={onClose} />
            </Suspense>
        </Modal>
    );
};
