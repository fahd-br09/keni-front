'use client';
import { useEffect, useState } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { getContacts, deleteContact } from '@/lib/api';
import { API_URL } from '@/lib/utils';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = () => getContacts().then(setMessages).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('حذف الرسالة؟')) { await deleteContact(id); load(); setSelected(null); }
  };

  const markRead = async (id: string) => {
    await fetch(`${API_URL}/api/contact/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` },
    });
    load();
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">الرسائل الواردة</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* List */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {messages.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">لا توجد رسائل</div>}
          {messages.map(m => (
            <div key={m._id} onClick={() => { setSelected(m); if (!m.isRead) markRead(m._id); }}
              className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${selected?._id === m._id ? 'bg-green-50' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm text-gray-900 flex items-center gap-1.5">
                  {m.isRead ? <MailOpen size={14} className="text-gray-400" /> : <Mail size={14} className="text-green-600" />}
                  {m.name}
                </span>
                <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString('ar-MA')}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-1">{m.subject}</p>
            </div>
          ))}
        </div>

        {/* Detail */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {!selected ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm py-20">اختر رسالة للعرض</div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-gray-900">{selected.subject}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{selected.name} — {selected.email}</p>
                  {selected.phone && <p className="text-sm text-gray-400">{selected.phone}</p>}
                </div>
                <button onClick={() => handleDelete(selected._id)} className="p-2 rounded-xl hover:bg-red-50 text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>
              <p className="text-xs text-gray-400 mt-3">{new Date(selected.createdAt).toLocaleString('ar-MA')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
