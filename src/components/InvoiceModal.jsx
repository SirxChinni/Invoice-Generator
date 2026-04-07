import React from 'react';
import InvoiceField from './InvoiceField';
import InvoicePdfExport from './InvoicePdfExport';

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
}) => {
  if (!isOpen) return null;

  const validItems = items.filter((item) => item.name.trim().length > 0);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4">
        <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700">
          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3 text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:text-zinc-100">
            <span>Review invoice</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              Close
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-5 pb-4 pt-3">
            <InvoiceField invoiceInfo={invoiceInfo} />

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
              <table className="w-full border-collapse text-xs">
                <thead className="bg-zinc-100 text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-center">Qty</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-[12px] text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                  {validItems.map((item, index) => {
                    const qty = Number(item.qty || 0);
                    const price = Number(item.price || 0);
                    const lineTotal = qty * price;

                    return (
                      <tr
                        key={item.id}
                        className="border-t border-zinc-200/70 dark:border-zinc-800/60"
                      >
                        <td className="px-4 py-2 align-middle">
                          <span className="text-[11px] font-medium text-zinc-900 dark:text-zinc-50">
                            {index + 1}. {item.name}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center align-middle tabular-nums">
                          {qty}
                        </td>
                        <td className="px-4 py-2 text-right align-middle tabular-nums">
                          ₹{price.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-right align-middle tabular-nums">
                          ₹{lineTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}

                  {validItems.length === 0 && (
                    <tr>
                      <td
                        className="px-4 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400"
                        colSpan={4}
                      >
                        No items added.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-5 py-3 text-xs dark:border-zinc-800">
            <div className="flex gap-2">
              <InvoicePdfExport invoiceInfo={invoiceInfo} items={validItems} />

              <button
                type="button"
                onClick={onAddNextInvoice}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                Next invoice
              </button>
            </div>

            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
              Tip: Download PDF for a branded invoice copy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceModal;