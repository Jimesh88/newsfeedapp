import { getNews } from '@/service/news';
import ClientHome from '@/components/clientHome';

export default async function HomePage() {
  const articles = await getNews(); // safe to use process.env here
  return <ClientHome initialArticles={articles} />;
}




