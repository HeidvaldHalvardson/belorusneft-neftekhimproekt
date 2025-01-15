import { useDispatch } from 'react-redux';

import type { AppDispatchType } from '../config/store';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
