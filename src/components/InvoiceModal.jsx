import React from 'react';

const InvoiceModal = ({ isOpen, setIsOpen, invoiceInfo, items, onAddNextInvoice }) => {
  if (!isOpen) return null;

  const validItems = items.filter((item) => item.name.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              Invoice preview
            </p>
            <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
              Invoice #{invoiceInfo.invoiceNumber}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
            aria-label="Close invoice preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6 sm:px-8">
          <div className="flex flex-col gap-6 border-b border-zinc-200 pb-6 dark:border-zinc-800 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Invoice Generator
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Professional invoice summary for billing, review, and download.
              </p>
            </div>

            <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
              <p>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Date:</span>{' '}
                {invoiceInfo.date}
              </p>
              <p>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Cashier:</span>{' '}
                {invoiceInfo.cashierName}
              </p>
              <p>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Customer:</span>{' '}
                {invoiceInfo.customerName}
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800/70">
                <tr className="text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900">
                {validItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-zinc-100 dark:border-zinc-800"
                  >
                    <td className="px-4 py-3 text-zinc-800 dark:text-zinc-100">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-300">
                      {item.qty}
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-300">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-zinc-900 dark:text-zinc-100">
                      ${(Number(item.qty) * Number(item.price)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 ml-auto max-w-sm space-y-3 rounded-2xl bg-zinc-50 p-5 dark:bg-zinc-800/60">
            <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
              <span>Subtotal</span>
              <span className="tabular-nums">${invoiceInfo.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
              <span>Discount</span>
              <span className="tabular-nums">-${invoiceInfo.discountRate.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
              <span>Tax</span>
              <span className="tabular-nums">+${invoiceInfo.taxRate.toFixed(2)}</span>
            </div>
            <div className="border-t border-zinc-200 pt-3 dark:border-zinc-700">
              <div className="flex items-center justify-between text-base font-semibold text-zinc-900 dark:text-white">
                <span>Total</span>
                <span className="tabular-nums">${invoiceInfo.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-white dark:focus:ring-offset-zinc-900"
            >
              Print / Save PDF
            </button>

            <button
              type="button"
              onClick={onAddNextInvoice}
              className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Next invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
