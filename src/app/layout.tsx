import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'بلدية القنيطرة',
  description: 'الموقع الرسمي لبلدية القنيطرة',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
