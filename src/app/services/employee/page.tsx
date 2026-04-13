'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, FileText, Calendar, CreditCard, ClipboardList, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

const EMPLOYEE_SERVICES = [
  { title: 'كشف الراتب', desc: 'الاطلاع على كشف الراتب الشهري وتحميله', icon: CreditCard },
  { title: 'طلب عطلة', desc: 'تقديم طلب عطلة سنوية أو استثنائية', icon: Calendar },
  { title: 'شهادة العمل', desc: 'طلب شهادة العمل أو الخبرة المهنية', icon: FileText },
  { title: 'المسار المهني', desc: 'الاطلاع على المسار الوظيفي والترقيات', icon: ClipboardList },
  { title: 'التكوين والتدريب', desc: 'الاطلاع على برامج التكوين المتاحة', icon: Users },
  { title: 'الوثائق الإدارية', desc: 'طلب الوثائق الإدارية الخاصة بالموظف', icon: FileText },
];

export default function EmployeePortalPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [form, setForm] = useState({ id: '', password: '' });
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (form.id && form.password) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('يرجى إدخال رقم الموظف وكلمة المرور');
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/services" className="text-gray-400 hover:text-green-700 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">فضاء الموظف</h1>
            <p className="text-gray-500 text-sm mt-0.5">خدمات إلكترونية خاصة بموظفي الجماعة</p>
          </div>
        </div>

        {!loggedIn ? (
          <div className="max-w-md mx-auto">
            <div className="bg-green-700 rounded-2xl p-8 text-white text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h2 className="text-xl font-bold mb-1">تسجيل الدخول</h2>
              <p className="text-green-100 text-sm">أدخل بياناتك للوصول إلى فضاء الموظف</p>
            </div>

            <form onSubmit={handleLogin} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الموظف</label>
                <input
                  type="text"
                  value={form.id}
                  onChange={e => setForm({ ...form, id: e.target.value })}
                  placeholder="أدخل رقم الموظف"
                  className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="أدخل كلمة المرور"
                  className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Lock size={16} /> دخول
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMPLOYEE_SERVICES.map(({ title, desc, icon: Icon }) => (
              <div key={title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <Icon className="text-green-700" size={22} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
