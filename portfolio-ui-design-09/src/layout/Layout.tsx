'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

interface LayoutProps {
  children: React.ReactNode;
}


export function Layout({ children }: LayoutProps) {
  return (
    <div className="site-container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
