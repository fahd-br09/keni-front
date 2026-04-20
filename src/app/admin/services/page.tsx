'use client';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { getServicesStore, addService, updateServiceItem, deleteServiceItem, type Service } from '@/lib/store';

const empty = { titleAr: '', descriptionAr: '', category: '', requiredDocuments: [] as string[] };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState(empty);
  const [docInput, setDocInput] = useState('');

  const load = () => setServices(getServicesStore());
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setDocInput(''); setModal(true); };
  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ titleAr: s.titleAr, descriptionAr: s.descriptionAr, category: s.category, requiredDocuments: [...s.requiredDocuments] });
    setDocInput('');
    setModal(true);
  };

  const handleSave = () => {
    if (!form.titleAr.trim()) return;
    if (editing) updateServiceItem(editing._id, form);
    else addService(form);
    setModal(false);
    load();
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من الحذف؟')) { deleteServiceItem(id); load(); }
  };

  const addDoc = () => {
    if (docInput.trim()) {
      setForm(p => ({ ...p, requiredDocuments: [...p.requiredDocuments, docInput.trim()] }));
      setDocInput('');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">إدارة الخدمات</h1>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-800 transition-colors">
          <Plus size={16} /> إضافة خدمة
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-right px-4 py-3 font-medium text-gray-600">الخدمة</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 hidden md:table-cell">التصنيف</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {services.map(s => (
              <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{s.titleAr}</div>
                  <div className="text-gray-400 text-xs line-clamp-1 mt-0.5">{s.descriptionAr}</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{s.category || '—'}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"><Pencil size={15} /></button>
                    <button onClick={() => handleDelete(s._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">لا توجد خدمات بعد</div>}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">{editing ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</h2>
              <button onClick={() => setModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <input placeholder="اسم الخدمة *" value={form.titleAr}
                onChange={e => setForm(p => ({ ...p, titleAr: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              <input placeholder="التصنيف (الحالة المدنية، التعمير...)" value={form.category}
                onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              <textarea placeholder="الوصف *" rows={3} value={form.descriptionAr}
                onChange={e => setForm(p => ({ ...p, descriptionAr: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">الوثائق المطلوبة</p>
                <div className="flex gap-2 mb-2">
                  <input placeholder="أضف وثيقة..." value={docInput}
                    onChange={e => setDocInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addDoc())}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                  <button onClick={addDoc} className="p-2 bg-green-700 text-white rounded-xl hover:bg-green-800"><Check size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.requiredDocuments.map((d, i) => (
                    <span key={i} className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
                      {d}
                      <button onClick={() => setForm(p => ({ ...p, requiredDocuments: p.requiredDocuments.filter((_, j) => j !== i) }))}><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>
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
