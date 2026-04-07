import React from 'react';
import InvoiceForm from './components/InvoiceForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-emerald-50 text-zinc-900 transition-colors dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-100">
      <InvoiceForm />
    </div>
  );
}

export default App;