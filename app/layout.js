import './globals.css';

export const metadata = {
  title: 'عيادة د. دانيا عوض | طب أسنان تجميلي وزراعة',
  description: 'عيادة متخصصة في طب الأسنان التجميلي والزراعة والتركيبات - الدوار السابع، عمان',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-tajawal bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
