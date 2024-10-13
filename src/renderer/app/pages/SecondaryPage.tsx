import { useEffect, useState } from 'react';
import { serviceGetAllNews } from '../../services/news.service';
import { News } from '../../interfaces/News.interface';
import { Link } from 'react-router-dom';

function SecondaryPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [news, setNews] = useState<News[]>([]);
  useEffect(() => {
    const usersFetch: any = async () => {
      setLoading(true);
      try {
        const responseNews = await serviceGetAllNews();
        setNews(responseNews);
      } catch (e) {
        console.error('Ha ocurrido un error en la petición');
      } finally {
        setLoading(false);
      }
    };
    usersFetch();
  }, []);
  return (
    <div className="bg-slate-300">
      {loading ? (
        <p>Cargando</p>
      ) : (
        <div>
          {news.map((item: News, index: number) => (
            <div
              className={`text-lg ${index % 2 === 0 ? 'text-red-500' : 'text-blue-500'}`}
              key={index}
            >
              {item.titulo}
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="text-primary ml-2">
        A la principal
      </Link>
    </div>
  );
}

export default SecondaryPage;
