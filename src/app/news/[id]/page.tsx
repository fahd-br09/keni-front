'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { getNewsStore } from '@/lib/store';

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = getNewsStore().find(n => n._id === id) ?? null;

  if (!item) return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Newspaper size={48} className="mb-3 opacity-30" />
        <p>الخبر غير موجود</p>
        <Link href="/news" className="mt-4 text-green-700 text-sm hover:underline flex items-center gap-1">
          <ArrowRight size={14} /> العودة للأخبار
        </Link>
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
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.titleAr} className="w-full h-72 object-cover rounded-2xl mb-6" />
        )}

        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">{item.category}</span>
        <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-3">{item.titleAr}</h1>
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Calendar size={14} />
          {new Date(item.createdAt).toLocaleDateString('fr-MA', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.contentAr}</div>
      </main>
      <Footer />
    </>
  );
}
