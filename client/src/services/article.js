import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {
      url: 'https://time.com/6266679/musk-ai-open-letter/',
      length: '3'
    },
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': 'a8ecddad32mshcec8b0122360b28p1ed558jsn771c1e7b54da',
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };


  const rapidApiKey=import.meta.env.VITE_RAPID_ARTICLE_API_KEY

export const articleApi = createApi({
    reducerPath:'articleApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`https://article-extractor-and-summarizer.p.rapidapi.com/`,
        prepareHeaders:(headers)=>{
            headers.set( 'X-RapidAPI-Key',rapidApiKey),
            headers.set( 'X-RapidAPI-Host','article-extractor-and-summarizer.p.rapidapi.com')
            return headers;
        }
    }),
    endpoints:(builder)=>({
        getSummary:builder.query({
            query:(params)=>`summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        })
    })
})

export const {useLazyGetSummaryQuery}=articleApi