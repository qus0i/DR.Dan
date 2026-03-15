export const SERVICES = [
  { id: 1, icon: '🦷', title: 'زراعة الأسنان', titleEn: 'Dental Implants', desc: 'حلول متقدمة لزراعة الأسنان باستخدام أحدث التقنيات العالمية لاستعادة ابتسامتك الطبيعية بثقة تامة', price: 'يبدأ من 400 د.أ', dur: '60 دقيقة', grad: 'from-teal-700 via-emerald-900 to-teal-600' },
  { id: 2, icon: '✨', title: 'تجميل الأسنان', titleEn: 'Cosmetic Dentistry', desc: 'ابتسامة هوليوود، فينيرز، وتبييض الأسنان بأحدث الطرق لمنحك ابتسامة مثالية وطبيعية', price: 'يبدأ من 200 د.أ', dur: '45 دقيقة', grad: 'from-violet-600 via-indigo-600 to-indigo-400' },
  { id: 3, icon: '👑', title: 'التركيبات والتيجان', titleEn: 'Crowns & Bridges', desc: 'تركيبات ثابتة ومتحركة بجودة عالية تعيد لأسنانك وظيفتها وجمالها الطبيعي', price: 'يبدأ من 150 د.أ', dur: '40 دقيقة', grad: 'from-amber-700 via-amber-500 to-yellow-400' },
  { id: 4, icon: '🔧', title: 'العلاج التحفظي', titleEn: 'Conservative Treatment', desc: 'حشوات تجميلية وعلاج جذور الأسنان بتقنيات حديثة للحفاظ على أسنانك الطبيعية', price: 'يبدأ من 50 د.أ', dur: '30 دقيقة', grad: 'from-sky-700 via-sky-600 to-sky-400' },
  { id: 5, icon: '💉', title: 'البوتكس التجميلي', titleEn: 'Botox Treatment', desc: 'علاجات البوتكس لتقليل التجاعيد واستعادة نضارة البشرة بأيدي خبيرة ومتخصصة', price: 'يبدأ من 100 د.أ', dur: '20 دقيقة', grad: 'from-pink-700 via-rose-600 to-rose-400' },
  { id: 6, icon: '😁', title: 'تبييض الأسنان', titleEn: 'Teeth Whitening', desc: 'تبييض الأسنان بالليزر والتقنيات المتقدمة للحصول على ابتسامة بيضاء ناصعة ومشرقة', price: 'يبدأ من 120 د.أ', dur: '35 دقيقة', grad: 'from-teal-700 via-yellow-600 to-teal-500' },
];

export const TIME_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00',
];

export const STATUS_MAP = {
  confirmed: { label: 'مؤكد', bg: 'bg-green-100', text: 'text-green-800' },
  pending:   { label: 'قيد الانتظار', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  cancelled: { label: 'ملغى', bg: 'bg-red-100', text: 'text-red-800' },
  completed: { label: 'مكتمل', bg: 'bg-purple-100', text: 'text-purple-800' },
};
