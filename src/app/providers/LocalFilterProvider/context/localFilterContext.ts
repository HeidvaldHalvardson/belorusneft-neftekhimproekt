import { createContext } from 'react';

export interface LocalFilterContextProps {
    filter?: string;
    setFilter?: (filter: string) => void;
}

export const LocalFilterContext = createContext<LocalFilterContextProps>({});
