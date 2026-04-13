'use client';
import { FileText, Newspaper, MessageSquare, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const cards = [
    { label: 'الخدمات', value: 6, icon: FileText, color: 'bg-blue-50 text-blue-700' },
    { label: 'الأخبار', value: 6, icon: Newspaper, color: 'bg-green-50 text-green-700' },
    { label: 'الرسائل', value: 0, icon: MessageSquare, color: 'bg-orange-50 text-orange-700' },
    { label: 'إجمالي المحتوى', value: 12, icon: TrendingUp, color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">لوحة التحكم</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color.split(' ')[0]}`}>
              <Icon className={color.split(' ')[1]} size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
