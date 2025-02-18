import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ArtikelDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + 'api/articles' + id)
      .then((response) => response.json())
      .then((data) => setArticle(data))
      .catch((error) => console.error("Error fetching article:", error));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  const sanitizeText = (text) => {
    return text
      .replace(/“|”/g, '"')  
      .replace(/‘|’/g, "'")  
      .replace(/\?\?\?/g, '') 
      .replace(/\uFFFD/g, ''); 
  };
  
  const renderContent = (content) => {
    const cleanContent = sanitizeText(content); 
  
    const lines = cleanContent.split("\n").map((line, index) => {
      if (line.trim() === "") return null;
  
      
      if (line.trim().match(/^\d+\./)) {
        return (
          <p key={index} className="text-lg font-bold text-green-800 mt-4">
            {line.trim()}
          </p>
        );
      }
  
      
      if (!line.match(/^\d+\./) && line.length < 80) {
        return (
          <h2 key={index} className="text-xl font-bold text-green-800 mt-6">
            {line.trim()}
          </h2>
        );
      }
  
      
      return (
        <p key={index} className="text-gray-700 leading-relaxed mt-2">
          {line.trim()}
        </p>
      );
    });
  
    return lines;
  };
  

  return (
    <div className="bg-[rgba(234,239,231,1)] min-h-screen">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 hover:underline"
        >
          &larr; Back to Articles
        </button>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-green-800 text-center">
          {article.title}
        </h1>
        <p className="text-gray-500 text-sm text-center mb-4">
          By {article.author}
        </p>
        <div className="text-center text-gray-500 text-sm mb-6">
          <p>Created at: {new Date(article.created_at).toLocaleString()}</p>
          <p>Last updated: {new Date(article.updated_at).toLocaleString()}</p>
        </div>
        <div className="flex justify-center mb-6">
          <img
            src={import.meta.env.VITE_API_URL + article.image_path}
            alt={article.title}
            className="w-full md:w-1/2 rounded-lg shadow-md"
          />
        </div>
        <p className="text-gray-600 text-center italic mb-6">
          {article.description}
        </p>
        <div className="text-gray-700 leading-relaxed mt-4 text-justify">
          {renderContent(article.content)}
        </div>
        <p className="text-sm text-gray-600">
           <strong>Source:</strong>{" "}
              <a
                href={article.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline" >
               {article.source}
              </a>
        </p>

      </div>
    </div>
  );
}

export default ArtikelDetail;
