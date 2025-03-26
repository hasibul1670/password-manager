import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;