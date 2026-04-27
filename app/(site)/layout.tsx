import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        {/* This div grows to fill the space between Header and Footer */}
        <div className="flex-grow pt-3">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}