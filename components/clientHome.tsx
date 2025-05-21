// components/ClientHome.tsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import { Article } from '@/types/article';
import Pagination from '@/components/pagination';

export default function ClientHome({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredArticles = useMemo(() => {
    return articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">News Articles</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {paginatedArticles.map((article, idx) => (
    <div
      key={idx}
      className="border rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
    >
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 mb-2">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Read more
        </a>
      </div>
    </div>
  ))}
</div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
