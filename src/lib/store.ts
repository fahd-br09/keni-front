// Local storage store — replaces backend for static frontend

export interface NewsItem {
  _id: string;
  titleAr: string;
  contentAr: string;
  image?: string;
  category: string;
  createdAt: string;
}

export interface Service {
  _id: string;
  titleAr: string;
  descriptionAr: string;
  category: string;
  requiredDocuments: string[];
}

const DEFAULT_NEWS: NewsItem[] = [
  { _id: '1', titleAr: 'انطلاق مشروع تهيئة الواجهة البحرية لمدينة القنيطرة', contentAr: 'أعلنت بلدية القنيطرة عن انطلاق أشغال تهيئة الواجهة البحرية في إطار مخطط التنمية الحضرية للمدينة، بتكلفة إجمالية تبلغ 50 مليون درهم.\n\nيندرج هذا المشروع ضمن الاستراتيجية الشاملة لتطوير المدينة وتحسين جودة الحياة للمواطنين.', image: '/images/news1.jpg', category: 'مشاريع', createdAt: '2026-04-10T10:00:00Z' },
  { _id: '2', titleAr: 'البلدية تطلق منصة رقمية لتتبع الطلبات الإدارية', contentAr: 'في إطار مسيرة التحول الرقمي، أطلقت بلدية القنيطرة منصة إلكترونية متكاملة تتيح للمواطنين تتبع طلباتهم الإدارية في الوقت الفعلي.', image: '/images/news2.jpg', category: 'رقمنة', createdAt: '2026-04-08T09:00:00Z' },
  { _id: '3', titleAr: 'حملة نظافة شاملة في أحياء المدينة', contentAr: 'نظمت البلدية حملة نظافة واسعة النطاق شملت جميع أحياء المدينة بمشاركة المواطنين والجمعيات المدنية والسلطات المحلية.', image: '/images/news3.jpg', category: 'بيئة', createdAt: '2026-04-05T08:00:00Z' },
  { _id: '4', titleAr: 'افتتاح حديقة عمومية جديدة بحي المسيرة', contentAr: 'افتتحت بلدية القنيطرة حديقة عمومية جديدة بحي المسيرة تضم مساحات خضراء وملاعب للأطفال ومرافق للراحة والترفيه.', image: '/images/news4.jpg', category: 'تهيئة', createdAt: '2026-04-02T11:00:00Z' },
  { _id: '5', titleAr: 'إعلان عن مباراة توظيف بالجماعة الحضرية', contentAr: 'تعلن الجماعة الحضرية للقنيطرة عن فتح باب الترشيح لمباراة توظيف في عدة تخصصات إدارية وتقنية. آخر أجل للتقديم 30 أبريل 2026.', image: '/images/news5.jpg', category: 'إعلانات', createdAt: '2026-03-28T10:00:00Z' },
  { _id: '6', titleAr: 'اجتماع المجلس الجماعي يصادق على ميزانية 2026', contentAr: 'صادق المجلس الجماعي للقنيطرة في دورته العادية على ميزانية السنة المالية 2026 البالغة 320 مليون درهم.', image: '/images/news6.jpg', category: 'مجلس', createdAt: '2026-03-20T14:00:00Z' },
];

const DEFAULT_SERVICES: Service[] = [
  { _id: '1', titleAr: 'شهادة الإقامة', descriptionAr: 'استخراج شهادة الإقامة إلكترونياً دون الحاجة للتنقل', category: 'الحالة المدنية', requiredDocuments: ['بطاقة التعريف الوطنية', 'عقد الكراء أو وثيقة الملكية', 'طلب مكتوب'] },
  { _id: '2', titleAr: 'رخصة البناء', descriptionAr: 'تقديم طلب الحصول على رخصة البناء أو التوسعة', category: 'التعمير', requiredDocuments: ['تصميم معماري معتمد', 'عقد الملكية', 'بطاقة التعريف الوطنية', 'رسم الوضعية'] },
  { _id: '3', titleAr: 'خدمات الحالة المدنية', descriptionAr: 'استخراج وثائق الحالة المدنية كعقود الازدياد والزواج', category: 'الحالة المدنية', requiredDocuments: ['بطاقة التعريف الوطنية', 'طلب مكتوب'] },
  { _id: '4', titleAr: 'الشكاوى والمقترحات', descriptionAr: 'تقديم شكاوى أو مقترحات لتحسين الخدمات البلدية', category: 'التواصل', requiredDocuments: ['بطاقة التعريف الوطنية'] },
  { _id: '5', titleAr: 'تسوية الوضعية الضريبية', descriptionAr: 'الاستفسار عن الوضعية الجبائية وتسوية المستحقات', category: 'الجباية', requiredDocuments: ['بطاقة التعريف الوطنية', 'آخر إشعار ضريبي'] },
  { _id: '6', titleAr: 'رخصة الاستغلال التجاري', descriptionAr: 'طلب رخصة فتح محل تجاري أو تجديدها', category: 'التعمير', requiredDocuments: ['بطاقة التعريف الوطنية', 'عقد الكراء', 'تصريح بالنشاط التجاري'] },
];

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }

// ── News ──────────────────────────────────────────────
export function getNewsStore(): NewsItem[] {
  if (typeof window === 'undefined') return DEFAULT_NEWS;
  try { return JSON.parse(localStorage.getItem('news') || 'null') ?? DEFAULT_NEWS; } catch { return DEFAULT_NEWS; }
}
export function saveNewsStore(items: NewsItem[]) {
  localStorage.setItem('news', JSON.stringify(items));
}
export function addNews(item: Omit<NewsItem, '_id' | 'createdAt'>): NewsItem {
  const n = { ...item, _id: uid(), createdAt: new Date().toISOString() };
  saveNewsStore([n, ...getNewsStore()]);
  return n;
}
export function updateNewsItem(id: string, data: Partial<NewsItem>) {
  saveNewsStore(getNewsStore().map(n => n._id === id ? { ...n, ...data } : n));
}
export function deleteNewsItem(id: string) {
  saveNewsStore(getNewsStore().filter(n => n._id !== id));
}

// ── Services ──────────────────────────────────────────
export function getServicesStore(): Service[] {
  if (typeof window === 'undefined') return DEFAULT_SERVICES;
  try { return JSON.parse(localStorage.getItem('services') || 'null') ?? DEFAULT_SERVICES; } catch { return DEFAULT_SERVICES; }
}
export function saveServicesStore(items: Service[]) {
  localStorage.setItem('services', JSON.stringify(items));
}
export function addService(item: Omit<Service, '_id'>): Service {
  const s = { ...item, _id: uid() };
  saveServicesStore([...getServicesStore(), s]);
  return s;
}
export function updateServiceItem(id: string, data: Partial<Service>) {
  saveServicesStore(getServicesStore().map(s => s._id === id ? { ...s, ...data } : s));
}
export function deleteServiceItem(id: string) {
  saveServicesStore(getServicesStore().filter(s => s._id !== id));
}
