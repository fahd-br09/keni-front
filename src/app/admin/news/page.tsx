'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { getNewsStore, addNews, updateNewsItem, deleteNewsItem, type NewsItem } from '@/lib/store';

const empty = { titleAr: '', contentAr: '', category: 'عام', image: '' };

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [form, setForm] = useState(empty);

  const load = () => setNews(getNewsStore());
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
  const openEdit = (n: NewsItem) => {
    setEditing(n);
    setForm({ titleAr: n.titleAr, contentAr: n.contentAr, category: n.category, image: n.image || '' });
    setModal(true);
  };

  const handleSave = () => {
    if (!form.titleAr.trim()) return;
    if (editing) updateNewsItem(editing._id, form);
    else addNews(form);
    setModal(false);
    load();
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من الحذف؟')) { deleteNewsItem(id); load(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">إدارة الأخبار</h1>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-800 transition-colors">
          <Plus size={16} /> إضافة خبر
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-right px-4 py-3 font-medium text-gray-600">العنوان</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 hidden md:table-cell">التصنيف</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 hidden md:table-cell">التاريخ</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {news.map(n => (
              <tr key={n._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{n.titleAr}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{n.category}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-400 text-xs">
                  {new Date(n.createdAt).toLocaleDateString('fr-MA')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(n)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(n._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {news.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">لا توجد أخبار بعد</div>}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{editing ? 'تعديل الخبر' : 'إضافة خبر جديد'}</h2>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <input placeholder="عنوان الخبر *" value={form.titleAr}
                onChange={e => setForm(p => ({ ...p, titleAr: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input placeholder="التصنيف (مشاريع، بيئة، إعلانات...)" value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input placeholder="مسار الصورة (مثال: /images/news1.jpg)" value={form.image}
                onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              <textarea placeholder="محتوى الخبر *" rows={5} value={form.contentAr}
                onChange={e => setForm(p => ({ ...p, contentAr: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3 justify-end">
              <button onClick={() => setModal(false)} className="px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100">إلغاء</button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl text-sm bg-green-700 text-white hover:bg-green-800">حفظ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
