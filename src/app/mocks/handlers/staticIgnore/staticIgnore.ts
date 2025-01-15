import { http } from 'msw';

export const staticIgnore = http.get('*', () => {});
