'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عن الجماعة' },
  { href: '/services', label: 'الخدمات' },
  { href: '/news', label: 'الأخبار' },
  { href: '/contact', label: 'اتصل بنا' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.ico"
            alt="جماعة القنيطرة"
            className="w-9 h-9 rounded-lg object-contain"
            onError={e => {
              const t = e.currentTarget;
              t.style.display = 'none';
              const fallback = t.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div className="w-9 h-9 rounded-lg bg-green-700 items-center justify-center text-white font-bold text-sm hidden" aria-hidden>ج</div>
          <span className="font-bold text-green-800 text-lg hidden sm:block">جماعة القنيطرة</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="px-4 py-2 rounded-lg text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors text-sm font-medium">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors text-sm font-medium">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
