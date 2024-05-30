// app/layout.tsx
import React, { ReactNode } from 'react';
import Navbar from './static/navbar';
import Footer from './static/footer';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Jim Chen's Website</title>
        </head>
        <body className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </>
  );
};

export default Layout;
