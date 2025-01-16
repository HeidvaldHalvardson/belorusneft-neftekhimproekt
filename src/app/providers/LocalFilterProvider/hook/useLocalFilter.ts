import { useContext } from 'react';

import type { LocalFilterContextProps } from '../context/localFilterContext';
import { LocalFilterContext } from '../context/localFilterContext';

export const useLocalFilter = (): LocalFilterContextProps => {
    const { filter, setFilter } = useContext(LocalFilterContext);

    return {
        filter,
        setFilter,
    };
};
