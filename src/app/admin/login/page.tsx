'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      localStorage.setItem('admin_token', 'static-token');
      router.push('/admin');
    } catch {
      setError('حدث خطأ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Lock className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">تسجيل الدخول</h1>
          <p className="text-sm text-gray-500 mt-1">لوحة إدارة الجماعة</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="اسم المستخدم" required
            value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          <input type="password" placeholder="كلمة المرور" required
            value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button type="submit" disabled={loading}
            className="w-full bg-green-700 text-white py-2.5 rounded-xl font-medium hover:bg-green-800 transition-colors disabled:opacity-60">
            {loading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
