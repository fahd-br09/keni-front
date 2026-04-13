'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, CheckCircle, Send } from 'lucide-react';
import { getService, submitContact } from '@/lib/api';

interface Service {
  _id: string;
  titleAr: string;
  descriptionAr: string;
  requiredDocuments: { nameAr: string }[];
}

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    getService(id).then(setService).catch(console.error);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitContact({ ...form, subject: `طلب خدمة: ${service?.titleAr}` });
    setSent(true);
  };

  if (!service) return (
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
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="bg-green-800 text-white rounded-2xl p-8 mb-8">
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-4">
            <FileText size={26} />
          </div>
          <h1 className="text-2xl font-bold mb-2">{service.titleAr}</h1>
          <p className="text-green-100 leading-relaxed">{service.descriptionAr}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Documents */}
          {service.requiredDocuments?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={18} />
                الوثائق المطلوبة
              </h2>
              <ul className="space-y-2">
                {service.requiredDocuments.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    {doc.nameAr}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Request Form */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Send className="text-green-600" size={18} />
              تقديم الطلب
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
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
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
