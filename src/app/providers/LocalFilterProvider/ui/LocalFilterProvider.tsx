import { useState } from 'react';

import { LocalFilterContext } from '../context/localFilterContext';

export const LocalFilterProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [filter, setFilter] = useState('');

    return (
        <LocalFilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </LocalFilterContext.Provider>
    );
};
