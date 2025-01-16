import { useCallback, useEffect, useRef, useState } from 'react';

import { Portal } from '@/shared/ui/Portal';

import styles from './Modal.module.scss';

interface ModalProps {
    children?: React.ReactNode;
    className?: string;
    isOpen: boolean;
    title?: string;
    onClose?: () => void;
}

const ANIMATION_DELAY = 250;

export const Modal = (props: ModalProps) => {
    const {
        children,
        className = '',
        title = '',
        isOpen = false,
        onClose,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    const onCloseHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onContentHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeydownHandler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCloseHandler();
            }
        },
        [onCloseHandler],
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeydownHandler);
        }

        return () => {
            window.removeEventListener('keydown', onKeydownHandler);
            clearTimeout(timerRef.current);
        };
    }, [isOpen, onKeydownHandler]);

    if (!isOpen) return null;

    return (
        <Portal>
            <div
                className={`${styles.Modal} 
                ${className} 
                ${isOpen ? styles.opened : ''} 
                ${isClosing ? styles['is-closing'] : ''}`}
            >
                <div className={styles.overlay} onClick={onCloseHandler}>
                    <div className={styles.content} onClick={onContentHandler}>
                        <h3 className={styles.title}>{title}</h3>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
