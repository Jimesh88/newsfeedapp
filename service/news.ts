import { Article } from "../types/article";


const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';


export const getNews = async (country: string='us'): Promise<Article[]> => {
  const url = `${BASE_URL}?country=${country}&apiKey=${API_KEY}`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  const data = await response.json();
  return data.articles;
}


