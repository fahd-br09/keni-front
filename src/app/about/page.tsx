import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">عن بلدية القنيطرة</h1>
          <p className="text-gray-500 max-w-xl mx-auto">نبذة عن الجماعة ورؤيتها ومهامها في خدمة المواطنين</p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold text-green-800 mb-4">من نحن</h2>
          <p className="text-gray-600 leading-relaxed text-base">
            بلدية القنيطرة هي الجماعة الترابية المسؤولة عن تدبير الشأن المحلي لمدينة القنيطرة، عاصمة جهة الرباط-سلا-القنيطرة.
            تضطلع الجماعة بمهام التنمية المحلية وتقديم الخدمات الإدارية للمواطنين في إطار اللامركزية الإدارية.
          </p>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Target, title: 'مهمتنا', color: 'bg-blue-50 text-blue-700', desc: 'تقديم خدمات إدارية عالية الجودة وتحسين جودة الحياة لسكان المدينة من خلال التدبير الفعال للموارد.' },
            { icon: Eye, title: 'رؤيتنا', color: 'bg-green-50 text-green-700', desc: 'مدينة قنيطرة نموذجية ومستدامة، تتميز بالتنمية الشاملة والحوكمة الجيدة وجودة الخدمات.' },
            { icon: Heart, title: 'قيمنا', color: 'bg-orange-50 text-orange-700', desc: 'الشفافية، النزاهة، الكفاءة، والتواصل الفعال مع المواطنين في صميم عملنا اليومي.' },
          ].map(({ icon: Icon, title, color, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color.split(' ')[0]}`}>
                <Icon className={color.split(' ')[1]} size={22} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Council */}
        <div className="bg-green-800 text-white rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">المجلس الجماعي</h2>
          <p className="text-green-100 leading-relaxed text-sm">
            يتكون المجلس الجماعي من منتخبين يمثلون مختلف أحياء المدينة، ويسهر على تدبير الشؤون المحلية
            واتخاذ القرارات المتعلقة بالتنمية والخدمات العامة وفق الصلاحيات المخولة له بموجب القانون التنظيمي للجماعات.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
