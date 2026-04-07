import React, { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <InvoiceForm darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;