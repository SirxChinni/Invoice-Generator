import React from 'react';

const InvoiceField = ({ onEditItem, cellData }) => {
  return (
    <input
      onChange={onEditItem}
      {...cellData}
      className={`w-full border-0 bg-transparent p-0 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-0 focus:outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500 ${cellData.className || ''}`}
    />
  );
};

export default InvoiceField;
