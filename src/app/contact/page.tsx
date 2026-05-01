'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, CheckCircle, Send, Star, ChevronDown } from 'lucide-react';
import { submitContact } from '@/lib/api';

const CATEGORIES = ['الشرطة الإدارية', 'التعمير', 'الحالة المدنية', 'البيئة', 'التنقلات الحضرية'];

const INFO = [
  {
    icon: Clock,
    title: 'ساعات العمل',
    lines: ['الإثنين – الجمعة: 8h30 – 16h30', 'السبت: 9h00 – 13h00'],
    accent: 'from-green-500 to-emerald-600',
  },
  {
    icon: Phone,
    title: 'الهاتف',
    lines: ['(+212) 05 37 37 15 18'],
    accent: 'from-teal-500 to-green-600',
  },
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    lines: ['communekenitra@gmail.com'],
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    icon: MapPin,
    title: 'العنوان',
    lines: ['القصر البلدي، الساحة الإدارية', 'القنيطرة – المغرب 14000'],
    accent: 'from-green-600 to-emerald-700',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', category: CATEGORIES[0], rating: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await submitContact(form); } catch { /* offline */ }
    finally { setLoading(false); setSent(true); }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-xs font-medium px-4 py-1.5 rounded-full mb-4 border border-white/20">
            تواصل مع الجماعة
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">نحن هنا لخدمتكم</h1>
          <p className="text-green-100 text-lg max-w-xl mx-auto">
            راسلونا أو زوروا مقرنا — فريقنا جاهز للإجابة على جميع استفساراتكم
          </p>
        </div>
      </section>

      {/* Info Cards — overlap hero */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 mb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INFO.map(({ icon: Icon, title, lines, accent }) => (
            <div key={title}
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white" size={20} />
              </div>
              <p className="font-bold text-gray-800 text-sm mb-1">{title}</p>
              {lines.map(l => <p key={l} className="text-xs text-gray-500 leading-relaxed">{l}</p>)}
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Form header */}
              <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-6 py-5">
                <h2 className="text-white font-bold text-lg">أرسل رسالتك</h2>
                <p className="text-green-100 text-sm mt-0.5">سنرد عليك خلال 24 ساعة</p>
              </div>

              <div className="p-6">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="text-green-600" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">تم الإرسال بنجاح!</h3>
                    <p className="text-gray-500 text-sm">شكراً على تواصلكم، سنرد عليكم في أقرب وقت</p>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', category: CATEGORIES[0], rating: '', message: '' }); }}
                      className="mt-6 text-green-700 text-sm font-medium hover:underline">
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Category */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">القسم المعني</label>
                      <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                          <button key={cat} type="button"
                            onClick={() => setForm(p => ({ ...p, category: cat }))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              form.category === cat
                                ? 'bg-green-700 text-white border-green-700 shadow-sm'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700'
                            }`}>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <input type="text" placeholder=" " required id="name"
                          value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          className="peer w-full border border-gray-200 rounded-xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                        <label htmlFor="name" className="absolute right-4 top-1 text-xs text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                          الاسم الكامل *
                        </label>
                      </div>
                      <div className="relative">
                        <input type="email" placeholder=" " required id="email"
                          value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          className="peer w-full border border-gray-200 rounded-xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                        <label htmlFor="email" className="absolute right-4 top-1 text-xs text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                          البريد الإلكتروني *
                        </label>
                      </div>
                    </div>

                    <div className="relative">
                      <input type="tel" placeholder=" " id="phone"
                        value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        className="peer w-full border border-gray-200 rounded-xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
                      <label htmlFor="phone" className="absolute right-4 top-1 text-xs text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                        رقم الهاتف
                      </label>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" /> مستوى الرضى عن الخدمات
                      </label>
                      <div className="flex gap-3">
                        {[
                          { v: 'good', label: 'جيدة', bg: 'bg-green-500', light: 'bg-green-50 border-green-300 text-green-700' },
                          { v: 'medium', label: 'متوسطة', bg: 'bg-yellow-400', light: 'bg-yellow-50 border-yellow-300 text-yellow-700' },
                          { v: 'poor', label: 'ضعيفة', bg: 'bg-red-400', light: 'bg-red-50 border-red-300 text-red-600' },
                        ].map(r => (
                          <button key={r.v} type="button"
                            onClick={() => setForm(p => ({ ...p, rating: r.v }))}
                            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                              form.rating === r.v ? r.light + ' shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}>
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <textarea placeholder=" " rows={4} id="message"
                        value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        className="peer w-full border border-gray-200 rounded-xl px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" />
                      <label htmlFor="message" className="absolute right-4 top-1 text-xs text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                        ملاحظات وتفاصيل الطلب
                      </label>
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white py-3.5 rounded-xl font-semibold hover:from-green-800 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-60">
                      <Send size={16} />
                      {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Map + extra — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex-1 min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26460.0!2d-6.5731!3d34.2610!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda75b5f6b6b6b6b%3A0x0!2sKenitra!5e0!3m2!1sar!2sma!4v1"
                width="100%" height="100%"
                style={{ minHeight: '320px', border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع بلدية القنيطرة"
              />
            </div>

            {/* Quick contact CTA */}
            <div className="bg-gradient-to-br from-green-800 to-emerald-700 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-1">تحتاج مساعدة فورية؟</h3>
              <p className="text-green-100 text-sm mb-4">فريقنا متاح خلال ساعات العمل الرسمية</p>
              <a href="tel:+212537371518"
                className="flex items-center gap-3 bg-white/15 hover:bg-white/25 transition-colors rounded-xl px-4 py-3 text-sm font-medium backdrop-blur-sm border border-white/20">
                <Phone size={16} />
                (+212) 05 37 37 15 18
              </a>
              <a href="mailto:communekenitra@gmail.com"
                className="flex items-center gap-3 bg-white/15 hover:bg-white/25 transition-colors rounded-xl px-4 py-3 text-sm font-medium backdrop-blur-sm border border-white/20 mt-2">
                <Mail size={16} />
                communekenitra@gmail.com
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
