import { Provider } from 'react-redux';

import { createReduxStore } from '@/app/providers/StoreProvider/config/store';

interface StoreProviderProps {
    children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const store = createReduxStore();

    return <Provider store={store}>{children}</Provider>;
};
