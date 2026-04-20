'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowLeft, Newspaper } from 'lucide-react';
import { getNewsStore, type NewsItem } from '@/lib/store';

const CATEGORY_COLORS: Record<string, string> = {
  'مشاريع':  'bg-blue-100 text-blue-700',
  'رقمنة':   'bg-purple-100 text-purple-700',
  'بيئة':    'bg-green-100 text-green-700',
  'تهيئة':   'bg-teal-100 text-teal-700',
  'إعلانات': 'bg-orange-100 text-orange-700',
  'مجلس':    'bg-gray-100 text-gray-700',
};

function categoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? 'bg-green-100 text-green-700';
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-MA', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('الكل');

  useEffect(() => {
    setNews(getNewsStore());
    setLoading(false);
  }, []);

  const categories = ['الكل', ...Array.from(new Set(news.map(n => n.category)))];
  const filtered = activeCategory === 'الكل' ? news : news.filter(n => n.category === activeCategory);
  const [featured, ...rest] = filtered;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block bg-white/15 text-white text-xs font-medium px-3 py-1 rounded-full mb-3 border border-white/20">
            آخر المستجدات
          </span>
          <h1 className="text-4xl font-bold mb-2">الأخبار والإعلانات</h1>
          <p className="text-green-100">تابع آخر أنشطة وأخبار بلدية القنيطرة</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-10">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? 'bg-green-700 text-white border-green-700 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Newspaper size={48} className="mx-auto mb-3 opacity-30" />
            <p>لا توجد أخبار حالياً</p>
          </div>
        ) : (
          <>
            {/* Featured card */}
            {featured && (
              <Link href={`/news/${featured._id}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className={`h-64 md:h-auto flex items-center justify-center ${featured.image ? '' : 'bg-gradient-to-br from-green-700 to-emerald-600'}`}>
                    {featured.image
                      ? <img src={featured.image} alt={featured.titleAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <Newspaper className="text-white/40" size={80} />
                    }
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColor(featured.category)}`}>
                        {featured.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={11} /> {formatDate(featured.createdAt)}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-700 transition-colors">
                      {featured.titleAr}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">{featured.contentAr}</p>
                    <span className="inline-flex items-center gap-1 text-green-700 font-semibold text-sm">
                      اقرأ المزيد <ArrowLeft size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(item => (
                <Link key={item._id} href={`/news/${item._id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all flex flex-col">
                  <div className={`h-44 flex items-center justify-center overflow-hidden ${item.image ? '' : 'bg-gradient-to-br from-green-700 to-emerald-600'}`}>
                    {item.image
                      ? <img src={item.image} alt={item.titleAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <Newspaper className="text-white/40" size={40} />
                    }
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors leading-snug">
                      {item.titleAr}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 flex-1">{item.contentAr}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={11} /> {formatDate(item.createdAt)}
                      </span>
                      <span className="text-green-700 text-xs flex items-center gap-1 font-semibold">
                        اقرأ المزيد <ArrowLeft size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
