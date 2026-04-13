'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FileText, CheckCircle, Send, ArrowRight } from 'lucide-react';

const SERVICES: Record<string, { titleAr: string; descriptionAr: string; requiredDocuments: string[] }> = {
  '1': { titleAr: 'شهادة الإقامة', descriptionAr: 'استخراج شهادة الإقامة إلكترونياً دون الحاجة للتنقل', requiredDocuments: ['بطاقة التعريف الوطنية', 'عقد الكراء أو وثيقة الملكية', 'طلب مكتوب'] },
  '2': { titleAr: 'رخصة البناء', descriptionAr: 'تقديم طلب الحصول على رخصة البناء أو التوسعة', requiredDocuments: ['تصميم معماري معتمد', 'عقد الملكية', 'بطاقة التعريف الوطنية', 'رسم الوضعية'] },
  '3': { titleAr: 'خدمات الحالة المدنية', descriptionAr: 'استخراج وثائق الحالة المدنية كعقود الازدياد والزواج', requiredDocuments: ['بطاقة التعريف الوطنية', 'طلب مكتوب'] },
  '4': { titleAr: 'الشكاوى والمقترحات', descriptionAr: 'تقديم شكاوى أو مقترحات لتحسين الخدمات البلدية', requiredDocuments: ['بطاقة التعريف الوطنية'] },
  '5': { titleAr: 'تسوية الوضعية الضريبية', descriptionAr: 'الاستفسار عن الوضعية الجبائية وتسوية المستحقات', requiredDocuments: ['بطاقة التعريف الوطنية', 'آخر إشعار ضريبي'] },
  '6': { titleAr: 'رخصة الاستغلال التجاري', descriptionAr: 'طلب رخصة فتح محل تجاري أو تجديدها', requiredDocuments: ['بطاقة التعريف الوطنية', 'عقد الكراء', 'تصريح بالنشاط التجاري'] },
};

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES[id] ?? null;
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (!service) return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <FileText size={48} className="mb-3 opacity-30" />
        <p>الخدمة غير موجودة</p>
        <Link href="/services" className="mt-4 text-green-700 text-sm hover:underline flex items-center gap-1">
          <ArrowRight size={14} /> العودة للخدمات
        </Link>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/services" className="flex items-center gap-2 text-green-700 text-sm mb-6 hover:underline">
          <ArrowRight size={14} /> العودة للخدمات
        </Link>

        <div className="bg-gradient-to-br from-green-800 to-emerald-700 text-white rounded-2xl p-8 mb-8">
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4">
            <FileText size={26} />
          </div>
          <h1 className="text-2xl font-bold mb-2">{service.titleAr}</h1>
          <p className="text-green-100 leading-relaxed">{service.descriptionAr}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" size={18} /> الوثائق المطلوبة
            </h2>
            <ul className="space-y-2">
              {service.requiredDocuments.map((doc, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Send className="text-green-600" size={18} /> تقديم الطلب
            </h2>
            {sent ? (
              <div className="text-center py-6">
                <CheckCircle className="text-green-500 mx-auto mb-2" size={40} />
                <p className="text-green-700 font-medium">تم إرسال طلبك بنجاح!</p>
                <p className="text-sm text-gray-500 mt-1">سنتواصل معك قريباً</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {[
                  { name: 'name', placeholder: 'الاسم الكامل', type: 'text' },
                  { name: 'email', placeholder: 'البريد الإلكتروني', type: 'email' },
                  { name: 'phone', placeholder: 'رقم الهاتف', type: 'tel' },
                ].map(f => (
                  <input key={f.name} type={f.type} placeholder={f.placeholder} required={f.name !== 'phone'}
                    value={form[f.name as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ))}
                <textarea placeholder="ملاحظات إضافية" rows={3}
                  value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
                <button type="submit"
                  className="w-full bg-green-700 text-white py-2.5 rounded-xl font-medium hover:bg-green-800 transition-colors">
                  إرسال الطلب
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
