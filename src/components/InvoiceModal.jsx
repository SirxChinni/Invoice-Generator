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
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4">
        <div className="w-full max-w-4xl overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-2xl ring-1 ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-zinc-700">
          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-5 py-4 text-sm font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Preview
              </p>
              <span className="text-base font-semibold">Review invoice</span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-600 shadow-sm hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Close
            </button>
          </div>

          <div className="max-h-[72vh] overflow-y-auto bg-gradient-to-b from-white to-zinc-50 px-5 pb-5 pt-4 dark:from-zinc-900 dark:to-zinc-950">
            <InvoiceField invoiceInfo={invoiceInfo} />

            <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <table className="w-full border-collapse text-xs">
                <thead className="bg-zinc-100 text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Item</th>
                    <th className="px-4 py-3 text-center">Qty</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Total</th>
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
                        <td className="px-4 py-3 align-middle">
                          <span className="text-[11px] font-medium text-zinc-900 dark:text-zinc-50">
                            {index + 1}. {item.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center align-middle tabular-nums">
                          {qty}
                        </td>
                        <td className="px-4 py-3 text-right align-middle tabular-nums">
                          ₹{price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right align-middle font-semibold tabular-nums">
                          ₹{lineTotal.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}

                  {validItems.length === 0 && (
                    <tr>
                      <td
                        className="px-4 py-8 text-center text-xs text-zinc-500 dark:text-zinc-400"
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

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 bg-white px-5 py-4 text-xs dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-wrap gap-2">
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
              Review items carefully before downloading the PDF.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceModal;