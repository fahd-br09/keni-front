import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">بلدية القنيطرة</h3>
          <p className="text-green-200 text-sm leading-relaxed">
            نسعى لتقديم أفضل الخدمات للمواطنين وتطوير المدينة نحو مستقبل أفضل.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">روابط سريعة</h3>
          <ul className="space-y-2 text-sm text-green-200">
            {[['/', 'الرئيسية'], ['/services', 'الخدمات'], ['/news', 'الأخبار'], ['/contact', 'اتصل بنا']].map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">تواصل معنا</h3>
          <ul className="space-y-2 text-sm text-green-200">
            <li className="flex items-center gap-2"><MapPin size={14} /> القنيطرة، المغرب</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +212 537 000 000</li>
            <li className="flex items-center gap-2"><Mail size={14} /> contact@commune-kenitra.ma</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-green-800 text-center py-4 text-green-300 text-xs">
        © {new Date().getFullYear()} بلدية القنيطرة. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
