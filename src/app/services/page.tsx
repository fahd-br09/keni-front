'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FileText, ArrowLeft, Search, Users } from 'lucide-react';
import { getServicesStore, type Service } from '@/lib/store';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setServices(getServicesStore());
    setLoading(false);
  }, []);

  const filtered = services.filter(s =>
    s.titleAr.includes(search) || s.descriptionAr.includes(search)
  );

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">الخدمات الجماعة</h1>
          <p className="text-gray-500">جميع الخدمات الإدارية في مكان واحد</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="ابحث عن خدمة..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          />
        </div>

        {/* Employee Portal */}
        <Link href="/services/employee"
          className="block bg-green-700 hover:bg-green-800 transition-colors rounded-2xl p-8 mb-10 text-white group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <Users size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">فضاء الموظف</h2>
              <p className="text-green-100 text-sm leading-relaxed">
                فضاء خاص يخول لموظفي الجماعة الاستفادة من مجموعة من الخدمات الإلكترونية...
              </p>
            </div>
            <ArrowLeft size={20} className="text-white/70 group-hover:text-white transition-colors shrink-0" />
          </div>
        </Link>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <FileText size={48} className="mx-auto mb-3 opacity-30" />
            <p>لا توجد خدمات متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(service => (
              <Link key={service._id} href={`/services/${service._id}`}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <FileText className="text-green-700" size={22} />
                </div>
                {service.category && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-2 inline-block">
                    {service.category}
                  </span>
                )}
                <h3 className="font-semibold text-gray-900 mb-2">{service.titleAr}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{service.descriptionAr}</p>
                <div className="flex items-center gap-1 text-green-700 text-sm mt-4 font-medium">
                  <span>التفاصيل</span><ArrowLeft size={14} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
