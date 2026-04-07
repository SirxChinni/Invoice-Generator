import React, { useState } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import incrementString from '../helpers/incrementString';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
    setCashierName('');
    setCustomerName('');
    setDiscount('');
    setTax('');
    setIsOpen(false);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id,
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    if (items.length === 1) return;
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const onEditItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editedItem.id
          ? { ...item, [editedItem.name]: editedItem.value }
          : item
      )
    );
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) {
      return prev + Number(curr.price) * Number(curr.qty);
    }
    return prev;
  }, 0);

  const taxRate = subtotal * (Number(tax || 0) / 100);
  const discountRate = subtotal * (Number(discount || 0) / 100);
  const total = subtotal - discountRate + taxRate;

  return (
    <form
      className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:px-0"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="overflow-hidden rounded-[30px] bg-white/95 shadow-[0_26px_70px_rgba(15,23,42,0.14)] ring-1 ring-zinc-100 transition-colors duration-300 dark:bg-zinc-900/95 dark:ring-zinc-800">
        <div className="flex flex-col justify-between gap-4 border-b border-zinc-200/70 bg-zinc-50/80 px-6 py-4 transition-colors duration-300 sm:flex-row sm:items-center sm:px-8 dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[12px] text-zinc-600 shadow-sm dark:bg-zinc-800 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>
              Date:{' '}
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {today}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <label
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400"
              htmlFor="invoiceNumber"
            >
              Invoice No.
            </label>
            <input
              required
              className="w-36 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 px-6 pb-6 pt-6 sm:px-8 sm:pb-8 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-6">
            <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
              <div className="xl:max-w-sm">
                <h1 className="text-lg font-semibold uppercase tracking-[0.22em] text-zinc-900 dark:text-white">
                  Invoice
                </h1>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Add line items, review totals, and generate a polished invoice.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 text-sm sm:grid-cols-2 xl:max-w-3xl xl:flex-1">
                <div>
                  <label
                    htmlFor="cashierName"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
                  >
                    Cashier
                  </label>
                  <input
                    required
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:bg-zinc-800"
                    placeholder="Enter cashier name"
                    type="text"
                    name="cashierName"
                    id="cashierName"
                    value={cashierName}
                    onChange={(event) => setCashierName(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
                  >
                    Customer
                  </label>
                  <input
                    required
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:bg-zinc-800"
                    placeholder="Enter customer name"
                    type="text"
                    name="customerName"
                    id="customerName"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/70 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950/40">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-left text-sm">
                  <thead className="bg-zinc-50/90 dark:bg-zinc-900">
                    <tr className="border-b border-zinc-200 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
                      <th className="px-4 py-3">Item</th>
                      <th className="w-24 px-4 py-3 text-center">Qty</th>
                      <th className="w-32 px-4 py-3 text-center">Price</th>
                      <th className="w-24 px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white dark:bg-zinc-900">
                    {items.map((item) => (
                      <InvoiceItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        qty={item.qty}
                        price={item.price}
                        onDeleteItem={deleteItemHandler}
                        onEdtiItem={onEditItemHandler}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 dark:focus:ring-offset-zinc-900"
              type="button"
              onClick={addItemHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add line item
            </button>
          </div>

          <aside className="w-full space-y-5 rounded-2xl bg-zinc-50/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.10)] ring-1 ring-zinc-200/80 transition-colors duration-300 md:max-w-md lg:max-w-sm xl:max-w-md dark:bg-zinc-900 dark:ring-zinc-800">
            <button
              className="w-full rounded-full bg-zinc-900 py-3 text-sm font-medium text-zinc-50 shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-white dark:focus:ring-offset-zinc-900"
              type="submit"
            >
              Review invoice
            </button>

            <InvoiceModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              invoiceInfo={{
                invoiceNumber,
                cashierName,
                customerName,
                subtotal,
                taxRate,
                discountRate,
                total,
                date: today,
              }}
              items={items}
              onAddNextInvoice={addNextInvoiceHandler}
            />

            <div className="space-y-4 border-t border-zinc-200/80 pt-4 text-sm dark:border-zinc-800">
              <div className="space-y-1.5">
                <label
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
                  htmlFor="tax"
                >
                  Tax rate
                </label>
                <div className="flex items-center">
                  <input
                    className="w-full rounded-l-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    type="number"
                    name="tax"
                    id="tax"
                    min="0"
                    step="0.01"
                    placeholder="0.0"
                    value={tax}
                    onChange={(event) => setTax(event.target.value)}
                  />
                  <span className="rounded-r-2xl border border-l-0 border-zinc-200 bg-zinc-100 px-4 py-2.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                    %
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
                  htmlFor="discount"
                >
                  Discount rate
                </label>
                <div className="flex items-center">
                  <input
                    className="w-full rounded-l-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    type="number"
                    name="discount"
                    id="discount"
                    min="0"
                    step="0.01"
                    placeholder="0.0"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                  />
                  <span className="rounded-r-2xl border border-l-0 border-zinc-200 bg-zinc-100 px-4 py-2.5 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                    %
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                  <span>Discount</span>
                  <span className="tabular-nums">
                    ({discount || '0'}%) ${discountRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                  <span>Tax</span>
                  <span className="tabular-nums">
                    ({tax || '0'}%) ${taxRate.toFixed(2)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-zinc-50 dark:bg-white dark:text-zinc-900">
                  <span className="font-medium uppercase tracking-[0.18em]">Total</span>
                  <span className="tabular-nums text-base font-semibold">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
