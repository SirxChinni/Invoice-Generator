import React from 'react';
import InvoiceField from './InvoiceField';

const InvoiceItem = ({ id, name, qty, price, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr className="group border-b border-zinc-100 last:border-0 dark:border-zinc-800">
      <td className="w-full px-3 py-3 sm:px-4">
        <div className="rounded-xl bg-white/90 px-3 py-2 shadow-[0_1px_0_rgba(15,23,42,0.03)] ring-1 ring-zinc-100 transition-all group-hover:bg-emerald-50/40 group-hover:ring-emerald-100 dark:bg-zinc-800/90 dark:ring-zinc-700 dark:group-hover:bg-zinc-800">
          <InvoiceField
            onEditItem={(event) => onEdtiItem(event)}
            cellData={{
              placeholder: 'Item name or service description',
              type: 'text',
              name: 'name',
              id,
              value: name,
              className: 'w-full text-left',
            }}
          />
        </div>
      </td>

      <td className="w-[90px] px-2 py-3 text-center sm:w-[100px] sm:px-3">
        <div className="mx-auto w-full max-w-[84px] rounded-xl bg-white/90 px-2 py-2 shadow-[0_1px_0_rgba(15,23,42,0.03)] ring-1 ring-zinc-100 transition-all group-hover:bg-emerald-50/40 group-hover:ring-emerald-100 dark:bg-zinc-800/90 dark:ring-zinc-700 dark:group-hover:bg-zinc-800">
          <InvoiceField
            onEditItem={(event) => onEdtiItem(event)}
            cellData={{
              type: 'number',
              min: '1',
              name: 'qty',
              id,
              value: qty,
              className: 'w-full text-center',
            }}
          />
        </div>
      </td>

      <td className="w-[130px] px-2 py-3 sm:w-[150px] sm:px-3">
        <div className="relative rounded-xl bg-white/90 px-3 py-2 shadow-[0_1px_0_rgba(15,23,42,0.03)] ring-1 ring-zinc-100 transition-all group-hover:bg-emerald-50/40 group-hover:ring-emerald-100 dark:bg-zinc-800/90 dark:ring-zinc-700 dark:group-hover:bg-zinc-800">
          <span className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 text-xs font-medium text-zinc-400 dark:text-zinc-500 sm:block">
            $
          </span>
          <InvoiceField
            onEditItem={(event) => onEdtiItem(event)}
            cellData={{
              className: 'w-full text-right sm:pl-4',
              type: 'number',
              min: '0.01',
              step: '0.01',
              name: 'price',
              id,
              value: price,
            }}
          />
        </div>
      </td>

      <td className="w-[96px] px-2 py-3 text-center sm:w-[110px] sm:px-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-rose-50 px-3 py-2 text-[11px] font-medium text-rose-500 shadow-[0_1px_0_rgba(248,113,113,0.25)] transition-all hover:bg-rose-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500 dark:hover:text-white dark:focus:ring-offset-zinc-900"
          onClick={deleteItemHandler}
          aria-label="Delete invoice item"
          title="Delete item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.7}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4.8a.8.8 0 00-.8-.8h-4.4a.8.8 0 00-.8.8V7M4 7h16"
            />
          </svg>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
