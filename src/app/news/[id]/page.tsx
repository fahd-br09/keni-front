'use client';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

const NEWS: Record<string, { titleAr: string; contentAr: string; image?: string; category: string; createdAt: string }> = {
  '1': { titleAr: 'انطلاق مشروع تهيئة الواجهة البحرية لمدينة القنيطرة', contentAr: 'أعلنت بلدية القنيطرة عن انطلاق أشغال تهيئة الواجهة البحرية في إطار مخطط التنمية الحضرية للمدينة، بتكلفة إجمالية تبلغ 50 مليون درهم.\n\nيندرج هذا المشروع ضمن الاستراتيجية الشاملة لتطوير المدينة وتحسين جودة الحياة للمواطنين، ويشمل تهيئة الأرصفة وإنشاء مساحات خضراء ومرافق ترفيهية على طول الواجهة البحرية.', image: '/images/news1.jpg', category: 'مشاريع', createdAt: '2026-04-10T10:00:00Z' },
  '2': { titleAr: 'البلدية تطلق منصة رقمية لتتبع الطلبات الإدارية', contentAr: 'في إطار مسيرة التحول الرقمي، أطلقت بلدية القنيطرة منصة إلكترونية متكاملة تتيح للمواطنين تتبع طلباتهم الإدارية في الوقت الفعلي.\n\nتوفر المنصة واجهة سهلة الاستخدام تمكن المواطنين من تقديم طلباتهم ومتابعة حالتها دون الحاجة للتنقل إلى مقر البلدية.', image: '/images/news2.jpg', category: 'رقمنة', createdAt: '2026-04-08T09:00:00Z' },
  '3': { titleAr: 'حملة نظافة شاملة في أحياء المدينة', contentAr: 'نظمت البلدية حملة نظافة واسعة النطاق شملت جميع أحياء المدينة بمشاركة المواطنين والجمعيات المدنية والسلطات المحلية.\n\nشهدت الحملة تعبئة واسعة من مختلف الفاعلين المحليين، وأسفرت عن تنظيف مئات الأطنان من النفايات وتجميل الفضاءات العامة.', image: '/images/news3.jpg', category: 'بيئة', createdAt: '2026-04-05T08:00:00Z' },
  '4': { titleAr: 'افتتاح حديقة عمومية جديدة بحي المسيرة', contentAr: 'افتتحت بلدية القنيطرة حديقة عمومية جديدة بحي المسيرة تضم مساحات خضراء وملاعب للأطفال ومرافق للراحة والترفيه.\n\nتمتد الحديقة على مساحة 3 هكتارات وتضم ممرات للمشي وأماكن للجلوس ومناطق مخصصة للأطفال.', image: '/images/news4.jpg', category: 'تهيئة', createdAt: '2026-04-02T11:00:00Z' },
  '5': { titleAr: 'إعلان عن مباراة توظيف بالجماعة الحضرية', contentAr: 'تعلن الجماعة الحضرية للقنيطرة عن فتح باب الترشيح لمباراة توظيف في عدة تخصصات إدارية وتقنية.\n\nآخر أجل للتقديم: 30 أبريل 2026\nللمزيد من المعلومات يرجى التوجه إلى مقر البلدية أو زيارة الموقع الرسمي.', image: '/images/news5.jpg', category: 'إعلانات', createdAt: '2026-03-28T10:00:00Z' },
  '6': { titleAr: 'اجتماع المجلس الجماعي يصادق على ميزانية 2026', contentAr: 'صادق المجلس الجماعي للقنيطرة في دورته العادية على ميزانية السنة المالية 2026 البالغة 320 مليون درهم.\n\nتولي الميزانية الجديدة أهمية قصوى لمشاريع البنية التحتية وتحسين الخدمات العامة وتطوير المناطق الحضرية.', image: '/images/news6.jpg', category: 'مجلس', createdAt: '2026-03-20T14:00:00Z' },
};

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const item = NEWS[id] ?? null;

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
