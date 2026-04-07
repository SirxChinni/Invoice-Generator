import React from 'react';

const formatCurrency = (v) => `₹${Number(v || 0).toFixed(2)}`;

const InvoiceField = ({ invoiceInfo }) => {
  const {
    businessName,
    invoiceNumber,
    cashierName,
    customerName,
    subtotal,
    taxRate,
    discountRate,
    total,
    date,
    orderType,
    paymentMethod,
    tableNumber,
  } = invoiceInfo;

  return (
    <header className="mb-4 border-b border-zinc-200 pb-3 text-xs text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-0.5">
          {businessName && (
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {businessName}
            </p>
          )}

          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            Invoice
          </p>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            #{invoiceNumber}
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Date:{' '}
            <span className="font-medium text-zinc-800 dark:text-zinc-100">{date}</span>
          </p>
        </div>

        <div className="grid min-w-[240px] grid-cols-2 gap-2 text-right">
          <div className="rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Cashier
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {cashierName || '-'}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Customer
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {customerName || '-'}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Order
            </p>
            <p className="mt-1 text-sm font-medium capitalize text-zinc-900 dark:text-zinc-50">
              {orderType || '-'}
            </p>
          </div>

          <div className="rounded-xl bg-zinc-50 px-3 py-2 dark:bg-zinc-900/60">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              Payment
            </p>
            <p className="mt-1 text-sm font-medium uppercase text-zinc-900 dark:text-zinc-50">
              {paymentMethod || '-'}
            </p>
            {tableNumber ? (
              <p className="mt-0.5 text-[10px] text-zinc-500 dark:text-zinc-400">
                Table: {tableNumber}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-zinc-600 dark:text-zinc-300">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatCurrency(subtotal)}</span>
        </p>
        <p className="flex justify-between">
          <span>Discount</span>
          <span className="tabular-nums">
            ({((discountRate / (subtotal || 1)) * 100 || 0).toFixed(1)}%) {formatCurrency(discountRate)}
          </span>
        </p>
        <p className="flex justify-between">
          <span>Tax</span>
          <span className="tabular-nums">
            ({((taxRate / (subtotal || 1)) * 100 || 0).toFixed(1)}%) {formatCurrency(taxRate)}
          </span>
        </p>
        <p className="flex justify-between font-semibold text-zinc-900 dark:text-zinc-50">
          <span>Total</span>
          <span className="tabular-nums">{formatCurrency(total)}</span>
        </p>
      </div>
    </header>
  );
};

export default InvoiceField;