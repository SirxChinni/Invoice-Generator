import React from 'react';

const InvoiceItem = ({
  id,
  name,
  qty,
  price,
  error,
  onDeleteItem,
  onEdtiItem,
  onIncrementQty,
  onDecrementQty,
}) => {
  const isNameEmpty = !name.trim();

  return (
    <tr className="align-middle transition-colors hover:bg-emerald-50/40 dark:hover:bg-zinc-800/30">
      <td className="pl-8 pr-5 py-4 align-middle">
        <div className="space-y-1.5">
          <input
            type="text"
            name="name"
            id={id}
            value={name}
            onChange={onEdtiItem}
            placeholder="Enter item name"
            className={`h-12 w-full rounded-2xl border px-4 text-[15px] font-medium tracking-[0.01em] text-zinc-900 outline-none transition duration-200 placeholder:text-zinc-400 focus:ring-2 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 ${
              error && isNameEmpty
                ? 'border-rose-300 bg-rose-50/60 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500/40 dark:bg-rose-500/10'
                : 'border-zinc-200 bg-zinc-50/80 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800/90 dark:focus:bg-zinc-800'
            }`}
          />
          {error && isNameEmpty && (
            <p className="pl-1 text-xs font-medium text-rose-500">{error}</p>
          )}
        </div>
      </td>

      <td className="px-5 py-4 align-middle">
        <div className="flex min-w-[180px] flex-col items-center justify-center">
          <div className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/80">
            <button
              type="button"
              onClick={() => onDecrementQty(id)}
              disabled={isNameEmpty}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold transition duration-200 focus:outline-none ${
                isNameEmpty
                  ? 'cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'
                  : 'bg-white text-zinc-700 shadow-sm hover:-translate-y-0.5 hover:bg-rose-50 hover:text-rose-600 focus:ring-2 focus:ring-rose-400/50 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-rose-500/10 dark:hover:text-rose-300'
              }`}
              aria-label="Decrease quantity"
              title={isNameEmpty ? 'Add item name first' : 'Decrease quantity'}
            >
              <span className="-mt-[1px]">−</span>
            </button>

            <div className="flex h-9 min-w-[44px] items-center justify-center rounded-full bg-white px-3 text-sm font-semibold text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100">
              {qty}
            </div>

            <button
              type="button"
              onClick={() => onIncrementQty(id)}
              disabled={isNameEmpty}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold transition duration-200 focus:outline-none ${
                isNameEmpty
                  ? 'cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600'
                  : 'bg-emerald-500 text-white shadow-sm hover:-translate-y-0.5 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400/50 dark:bg-emerald-500 dark:hover:bg-emerald-400'
              }`}
              aria-label="Increase quantity"
              title={isNameEmpty ? 'Add item name first' : 'Increase quantity'}
            >
              <span className="-mt-[1px]">+</span>
            </button>
          </div>

          {error && isNameEmpty && (
            <p className="mt-1.5 text-center text-[11px] font-medium text-rose-500">
              Add item name first
            </p>
          )}
        </div>
      </td>

      <td className="px-5 py-4 align-middle">
        <div className="flex justify-center">
          <input
            type="number"
            name="price"
            id={id}
            min="0"
            step="0.01"
            value={price}
            onChange={onEdtiItem}
            placeholder="0.00"
            className="h-12 w-[130px] rounded-2xl border border-zinc-200 bg-zinc-50/80 px-4 text-center text-[15px] font-medium text-zinc-900 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-800"
          />
        </div>
      </td>

      <td className="px-5 py-4 align-middle">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onDeleteItem(id)}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-600 transition duration-200 hover:bg-rose-100 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400/40 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InvoiceItem;