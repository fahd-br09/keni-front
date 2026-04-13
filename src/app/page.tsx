import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MediaGallery from '@/components/MediaGallery';
import Link from 'next/link';
import { FileText, Users, Building2, Phone, ArrowLeft, Star, TrendingUp, Shield } from 'lucide-react';

const stats = [
  { label: 'خدمة متاحة', value: '+40', icon: FileText },
  { label: 'مواطن مستفيد', value: '+200 ألف', icon: Users },
  { label: 'مشروع منجز', value: '+150', icon: Building2 },
  { label: 'سنة خدمة', value: '+60', icon: Star },
];

const quickServices = [
  { title: 'شهادة الإقامة', desc: 'احصل على شهادة إقامتك إلكترونياً', icon: FileText, href: '/services' },
  { title: 'رخصة البناء', desc: 'تقديم طلب رخصة البناء', icon: Building2, href: '/services' },
  { title: 'الحالة المدنية', desc: 'خدمات الحالة المدنية', icon: Users, href: '/services' },
  { title: 'الشكاوى والمقترحات', desc: 'تواصل معنا مباشرة', icon: Phone, href: '/contact' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 text-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6 backdrop-blur-sm">
              <Shield size={14} />
              <span>الموقع الرسمي لبلدية القنيطرة</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              خدمات بلدية القنيطرة
              <span className="block text-green-200 text-3xl md:text-4xl mt-2 font-normal">في متناول يدك</span>
            </h1>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              نقدم لكم خدمات إدارية متكاملة بطريقة سهلة وسريعة. ابدأ طلبك الآن دون الحاجة للتنقل.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/services"
                className="bg-white text-green-800 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                استعرض الخدمات <ArrowLeft size={16} />
              </Link>
              <Link href="/contact"
                className="border border-white/40 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                تواصل معنا
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <Icon className="mx-auto mb-2 text-green-600" size={24} />
                <div className="text-2xl font-bold text-green-800">{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Services */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">الخدمات الأكثر طلباً</h2>
              <p className="text-gray-500 mt-1 text-sm">وصول سريع للخدمات الأساسية</p>
            </div>
            <Link href="/services" className="text-green-700 text-sm font-medium hover:underline flex items-center gap-1">
              عرض الكل <ArrowLeft size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickServices.map(({ title, desc, icon: Icon, href }) => (
              <Link key={title} href={href}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <Icon className="text-green-700" size={22} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section className="bg-green-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">لماذا بلديتنا الرقمية؟</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, title: 'سرعة وكفاءة', desc: 'إنجاز معاملاتك في أقل وقت ممكن بدون تعقيدات' },
                { icon: Shield, title: 'أمان وموثوقية', desc: 'بياناتك محمية وخدماتنا معتمدة رسمياً' },
                { icon: Phone, title: 'دعم مستمر', desc: 'فريق دعم متاح لمساعدتك في أي وقت' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-green-700" size={26} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Gallery */}
        <MediaGallery />

      </main>
      <Footer />
    </>
  );
}
