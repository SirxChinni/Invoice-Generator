import React from 'react';

const formatCurrency = (v) => `₹${Number(v || 0).toFixed(2)}`;

const InvoiceField = ({ invoiceInfo }) => {
  const {
    invoiceNumber,
    cashierName,
    customerName,
    subtotal,
    taxRate,
    discountRate,
    total,
    date,
  } = invoiceInfo;

  const subtotalSafe = Number(subtotal || 0);
  const discountPercent = subtotalSafe > 0 ? ((Number(discountRate || 0) / subtotalSafe) * 100).toFixed(1) : '0.0';
  const taxPercent = subtotalSafe > 0 ? ((Number(taxRate || 0) / subtotalSafe) * 100).toFixed(1) : '0.0';

  return (
    <header className="mb-5 overflow-hidden rounded-3xl border border-zinc-200/80 bg-gradient-to-br from-white via-zinc-50 to-emerald-50/60 p-5 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
            Invoice
          </p>
          <p className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            #{invoiceNumber}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Date:{' '}
            <span className="font-semibold text-zinc-800 dark:text-zinc-100">
              {date}
            </span>
          </p>
        </div>

        <div className="grid min-w-[220px] grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Cashier
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {cashierName || '-'}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Customer
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {customerName || '-'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] sm:grid-cols-4">
        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">Subtotal</p>
          <p className="mt-1 text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {formatCurrency(subtotal)}
          </p>
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">Discount</p>
          <p className="mt-1 text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            ({discountPercent}%) {formatCurrency(discountRate)}
          </p>
        </div>

        <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">Tax</p>
          <p className="mt-1 text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            ({taxPercent}%) {formatCurrency(taxRate)}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 px-4 py-3 shadow-sm ring-1 ring-zinc-900 dark:bg-white dark:text-zinc-900 dark:ring-white">
          <p className="text-zinc-300 dark:text-zinc-500">Total</p>
          <p className="mt-1 text-sm font-bold tabular-nums text-white dark:text-zinc-900">
            {formatCurrency(total)}
          </p>
        </div>
      </div>
    </header>
  );
};

export default InvoiceField;