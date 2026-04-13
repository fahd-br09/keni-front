'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { getNewsItem } from '@/lib/api';
import { API_URL } from '@/lib/utils';

interface NewsItem {
  _id: string;
  titleAr: string;
  contentAr: string;
  image?: string;
  category: string;
  createdAt: string;
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    getNewsItem(id).then(setItem).catch(console.error);
  }, [id]);

  if (!item) return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/news" className="flex items-center gap-2 text-green-700 text-sm mb-6 hover:underline">
          <ArrowRight size={14} /> العودة للأخبار
        </Link>

        {item.image && (
          <img src={`${API_URL}${item.image}`} alt={item.titleAr}
            className="w-full h-72 object-cover rounded-2xl mb-6" />
        )}

        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">{item.category}</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-3">{item.titleAr}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Calendar size={14} />
          {new Date(item.createdAt).toLocaleDateString('ar-MA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {item.contentAr}
        </div>
      </main>
      <Footer />
    </>
  );
}
