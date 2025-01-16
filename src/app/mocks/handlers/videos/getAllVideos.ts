import { http, HttpResponse } from 'msw';

import mockData from '../../db/response.json';

export const getAllVideosHandler = http.get('/videos', ({ request }) => {
    const url = new URL(request.url);
    const limit = +url.searchParams.get('limit');
    const page = +url.searchParams.get('page');
    const sort = url.searchParams.get('sort');
    const filter = url.searchParams.get('filter').toLowerCase();

    let sortData = [...mockData.items];

    const [field, direction] = sort.split('.');

    sortData.sort((a, b) => {
        if (field === 'date') {
            const dateA = new Date(a.snippet.publishedAt).getTime();
            const dateB = new Date(b.snippet.publishedAt).getTime();
            return direction === 'asc' ? dateB - dateA : dateA - dateB;
        } else if (field === 'views') {
            return direction === 'asc'
                ? +b.statistics.viewCount - +a.statistics.viewCount
                : +a.statistics.viewCount - +b.statistics.viewCount;
        }

        return 0;
    });

    if (filter) {
        sortData = sortData.filter(item =>
            item.snippet.title.toLowerCase().includes(filter),
        );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const items = sortData.slice(startIndex, endIndex);

    return HttpResponse.json({
        ...mockData,
        pageInfo: { ...mockData.pageInfo, totalResults: sortData.length },
        items,
    });
});
