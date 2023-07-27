import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface GifData {
    data: {
        images: {
            original: {
                url: string;
            };
        };
    };
}

export const gifApi = createApi({
    reducerPath: 'gifApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.giphy.com/v1/gifs' }),
    endpoints: (build) => ({
        fetchRandonGif: build.query<GifData, string>({
            query: () => ({
                url: '/random',
                params: {
                    api_key: import.meta.env.VITE_API_KEY
                }
            })
        })
    })
});