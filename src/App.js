import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import InvoiceForm from './components/InvoiceForm';
import Footer from './components/Footer';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-emerald-50 text-zinc-900 transition-colors duration-300 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <InvoiceForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
