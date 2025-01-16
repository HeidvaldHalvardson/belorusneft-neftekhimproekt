export interface VideoThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface VideoSnippet {
    title: string;
    description: string;
    publishedAt: string;
    channelId: string;
    thumbnails: {
        default: VideoThumbnail;
        medium: VideoThumbnail;
        high: VideoThumbnail;
        standard: VideoThumbnail;
        maxres: VideoThumbnail;
    };
}

export interface VideoStatistics {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
}

export interface VideoItem {
    id: string;
    kind: string;
    etag: string;
    snippet: VideoSnippet;
    statistics: VideoStatistics;
}

export interface VideoListResponse {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: VideoItem[];
}

export type SortParams = 'date.asc' | 'date.desc' | 'views.asc' | 'views.desc';

export interface QueryParams {
    limit?: number;
    page?: number;
    sort?: SortParams;
    filter?: string;
}
