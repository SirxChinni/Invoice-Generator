import React, { useMemo, useState } from 'react';
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

const createNewItem = () => ({
  id: uid(6),
  name: '',
  qty: 1,
  price: '1.00',
});

const quickItems = [
  { id: 1, name: 'Tea', price: '15.00', category: 'Drinks', type: 'veg', color: 'from-amber-500 to-orange-500' },
  { id: 2, name: 'Coffee', price: '20.00', category: 'Drinks', type: 'veg', color: 'from-stone-600 to-stone-800' },
  { id: 3, name: 'Cold Drink', price: '20.00', category: 'Drinks', type: 'veg', color: 'from-cyan-500 to-sky-500' },

  { id: 4, name: 'Paneer Butter Masala', price: '180.00', category: 'Curries', type: 'veg', color: 'from-orange-500 to-amber-500' },
  { id: 5, name: 'Kaju Paneer', price: '200.00', category: 'Curries', type: 'veg', color: 'from-yellow-500 to-orange-500' },
  { id: 6, name: 'Kaju Chicken', price: '250.00', category: 'Curries', type: 'non-veg', color: 'from-rose-500 to-red-600' },
  { id: 7, name: 'Chicken Butter Masala', price: '300.00', category: 'Curries', type: 'non-veg', color: 'from-red-500 to-orange-500' },

  { id: 8, name: 'Roti', price: '10.00', category: 'Roti & Naans', type: 'veg', color: 'from-amber-400 to-yellow-500' },
  { id: 9, name: 'Naan', price: '30.00', category: 'Roti & Naans', type: 'veg', color: 'from-orange-400 to-amber-500' },
  { id: 10, name: 'Butter Naan', price: '50.00', category: 'Roti & Naans', type: 'veg', color: 'from-yellow-400 to-orange-400' },

  { id: 11, name: 'Veg Biryani', price: '150.00', category: 'Biryani', type: 'veg', color: 'from-emerald-500 to-green-600' },
  { id: 12, name: 'Chicken Biryani', price: '200.00', category: 'Biryani', type: 'non-veg', color: 'from-rose-500 to-red-500' },
  { id: 13, name: 'Mutton Biryani', price: '250.00', category: 'Biryani', type: 'non-veg', color: 'from-red-600 to-orange-600' },
  { id: 14, name: 'Fry Piece Biryani', price: '220.00', category: 'Biryani', type: 'non-veg', color: 'from-orange-500 to-red-500' },
  { id: 15, name: 'Hyderabadi Dum Biryani', price: '230.00', category: 'Biryani', type: 'non-veg', color: 'from-fuchsia-500 to-rose-600' },

  { id: 16, name: 'Mushroom Fried Rice', price: '120.00', category: 'Rice', type: 'veg', color: 'from-lime-500 to-emerald-500' },
  { id: 17, name: 'Paneer Fried Rice', price: '150.00', category: 'Rice', type: 'veg', color: 'from-green-500 to-teal-500' },
  { id: 18, name: 'Egg Fried Rice', price: '150.00', category: 'Rice', type: 'non-veg', color: 'from-yellow-500 to-orange-500' },
  { id: 19, name: 'Chicken Fried Rice', price: '200.00', category: 'Rice', type: 'non-veg', color: 'from-red-500 to-orange-500' },

  { id: 20, name: 'Gulab Jamun (2 pcs)', price: '20.00', category: 'Desserts', type: 'veg', color: 'from-pink-500 to-rose-500' },
  { id: 21, name: 'Ice Cream', price: '25.00', category: 'Desserts', type: 'veg', color: 'from-sky-400 to-cyan-500' },
];

const categories = ['All', 'Drinks', 'Curries', 'Roti & Naans', 'Biryani', 'Rice', 'Desserts'];

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [orderType, setOrderType] = useState('dine-in');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [tableNumber, setTableNumber] = useState('');
  const [items, setItems] = useState([createNewItem()]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [itemErrors, setItemErrors] = useState({});
  const [invoiceError, setInvoiceError] = useState('');

  const validItems = useMemo(() => {
    return items.filter((item) => item.name.trim().length > 0);
  }, [items]);

  const hasValidItems = validItems.length > 0;

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();

    if (!hasValidItems) {
      setInvoiceError('Add at least one item before reviewing the invoice.');
      setIsOpen(false);
      return;
    }

    setInvoiceError('');
    setIsOpen(true);
  };
  

  const clearFormHandler = () => {
    setCashierName('');
    setCustomerName('');
    setBusinessName('');
    setDiscount('');
    setTax('');
    setOrderType('dine-in');
    setPaymentMethod('cash');
    setTableNumber('');
    setItems([createNewItem()]);
    setItemErrors({});
    setInvoiceError('');
    setIsOpen(false);
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setActiveCategory('All');
  };

  const addNextInvoiceHandler = () => {
    clearFormHandler();
  };

  const addItemHandler = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
    setInvoiceError('');
  };

  const addQuickItemHandler = (product) => {
    setItems((prevItems) => {
      const matchedItem = prevItems.find(
        (item) =>
          item.name.trim().toLowerCase() === product.name.trim().toLowerCase()
      );

      if (matchedItem) {
        return prevItems.map((item) =>
          item.name.trim().toLowerCase() === product.name.trim().toLowerCase()
            ? { ...item, qty: Number(item.qty) + 1 }
            : item
        );
      }

      const hasOnlyEmptyStarterRow =
        prevItems.length === 1 &&
        !prevItems[0].name.trim() &&
        Number(prevItems[0].qty) === 1 &&
        Number(prevItems[0].price) === 1;

      if (hasOnlyEmptyStarterRow) {
        return [
          {
            ...prevItems[0],
            name: product.name,
            qty: 1,
            price: product.price,
          },
        ];
      }

      return [
        ...prevItems,
        {
          id: uid(6),
          name: product.name,
          qty: 1,
          price: product.price,
        },
      ];
    });

    setInvoiceError('');
  };

  const incrementQtyHandler = (id) => {
    setItems((prevItems) => {
      const targetItem = prevItems.find((item) => item.id === id);

      if (!targetItem || !targetItem.name.trim()) {
        setItemErrors((prev) => ({
          ...prev,
          [id]: 'Add item name first',
        }));
        return prevItems;
      }

      setItemErrors((prev) => ({
        ...prev,
        [id]: '',
      }));

      return prevItems.map((item) =>
        item.id === id ? { ...item, qty: Number(item.qty) + 1 } : item
      );
    });
  };

  const decrementQtyHandler = (id) => {
    setItems((prevItems) => {
      const targetItem = prevItems.find((item) => item.id === id);

      if (!targetItem || !targetItem.name.trim()) {
        setItemErrors((prev) => ({
          ...prev,
          [id]: 'Add item name first',
        }));
        return prevItems;
      }

      setItemErrors((prev) => ({
        ...prev,
        [id]: '',
      }));

      return prevItems.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, Number(item.qty) - 1) }
          : item
      );
    });
  };

  const deleteItemHandler = (id) => {
    if (items.length === 1) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setItemErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[id];
      return updatedErrors;
    });
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

    if (editedItem.name === 'name') {
      setItemErrors((prev) => ({
        ...prev,
        [editedItem.id]: editedItem.value.trim() ? '' : prev[editedItem.id],
      }));

      if (editedItem.value.trim()) {
        setInvoiceError('');
      }
    }
  };

  const filteredQuickItems =
    activeCategory === 'All'
      ? quickItems
      : quickItems.filter((item) => item.category === activeCategory);

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
      className="mx-auto flex max-w-[1778px] flex-col gap-6 px-4 py-6 md:px-0"
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
          <div className="min-w-0 flex-1 space-y-6">
            <div className="flex flex-col justify-between gap-6 rounded-[26px] border border-zinc-200 bg-gradient-to-br from-white via-zinc-50 to-zinc-100/80 px-5 py-5 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 xl:flex-row xl:items-end">
              <div className="xl:max-w-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Invoice
                </div>
                <h1 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-zinc-900 dark:text-white">
                  Add line items and review totals
                </h1>
                <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                  Create a polished restaurant invoice with fast item entry and clean billing details.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 text-sm lg:grid-cols-2 xl:max-w-2xl xl:flex-1">
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
                  >
                    Business name
                  </label>
                  <input
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:bg-zinc-800"
                    placeholder="Enter business name"
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="cashierName"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
                  >
                    Cashier
                  </label>
                  <input
                    required
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:bg-zinc-800"
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
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:bg-zinc-800"
                    placeholder="Enter customer name"
                    type="text"
                    name="customerName"
                    id="customerName"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="tableNumber"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
                  >
                    Table no. (optional)
                  </label>
                  <input
                    className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:bg-zinc-800"
                    placeholder="Eg: T1"
                    type="text"
                    name="tableNumber"
                    id="tableNumber"
                    value={tableNumber}
                    onChange={(event) => setTableNumber(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50/70 p-4 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950/40">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                      Order type
                    </p>
                    {/* <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Choose how the order will be served.
                    </p> */}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-white p-1.5 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                  {[
                    { value: 'dine-in', label: 'Dine in' },
                    { value: 'takeaway', label: 'Takeaway' },
                  ].map((option) => {
                    const isActive = orderType === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setOrderType(option.value)}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-emerald-500 text-white shadow-[0_8px_24px_rgba(16,185,129,0.28)]'
                            : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[24px] border border-zinc-200 bg-zinc-50/70 p-4 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950/40">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                      Payment method
                    </p>
                    {/* <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Select the preferred payment mode.
                    </p> */}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-white p-1.5 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
                  {[
                    { value: 'cash', label: 'Cash' },
                    { value: 'card', label: 'Card' },
                    { value: 'upi', label: 'UPI' },
                  ].map((option) => {
                    const isActive = paymentMethod === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPaymentMethod(option.value)}
                        className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-zinc-900 text-white shadow-[0_8px_24px_rgba(24,24,27,0.22)] dark:bg-white dark:text-zinc-900'
                            : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full max-w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-950/40">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  Quick add menu
                </p>
                {/* <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Choose items in a natural meal order and add them quickly to the invoice.
                </p> */}
              </div>

              <div className="mt-4 overflow-x-auto pb-2">
                <div className="flex w-max min-w-full flex-nowrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                        activeCategory === category
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-x-auto pb-2">
                <div className="flex w-max min-w-full flex-nowrap gap-3">
                  {filteredQuickItems.map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => addQuickItemHandler(product)}
                      className="relative shrink-0 min-w-[180px] max-w-[180px] rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-emerald-500"
                    >
                      <span
                        className={`absolute right-3 top-3 inline-flex h-3.5 w-3.5 rounded-full ring-2 ring-white dark:ring-zinc-800 ${
                          product.type === 'veg' ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                        title={product.type === 'veg' ? 'Veg item' : 'Non-veg item'}
                      />

                      <div
                        className={`mb-3 h-2 w-16 rounded-full bg-gradient-to-r ${product.color}`}
                      />

                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                        {product.category}
                      </p>

                      <h3 className="mt-1 line-clamp-2 pr-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {product.name}
                      </h3>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-base font-bold text-zinc-900 dark:text-white">
                          ₹{product.price}
                        </span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                          Add
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {invoiceError && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300">
                {invoiceError}
              </div>
            )}

            <div className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white/80 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900/70">
              <div className="border-b border-zinc-200/80 px-6 py-4 dark:border-zinc-800">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                      Invoice items
                    </p>
                    {/* <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Add or edit line items below. The table stays scrollable as the list grows.
                    </p> */}
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
              </div>

              <div className="overflow-x-auto">
                <div className="max-h-[430px] overflow-y-auto">
                  <table className="w-full min-w-[860px] border-collapse">
                    <thead className="sticky top-0 z-10 bg-zinc-50/95 backdrop-blur dark:bg-zinc-900/95">
                      <tr className="border-b border-zinc-200/80 dark:border-zinc-800">
                        <th className="pl-8 pr-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                          Item
                        </th>
                        <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                          Qty
                        </th>
                        <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                          Price
                        </th>
                        <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-200/70 bg-white dark:divide-zinc-800/80 dark:bg-zinc-900">
                      {items.map((item) => (
                        <InvoiceItem
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          qty={item.qty}
                          price={item.price}
                          error={itemErrors[item.id]}
                          onDeleteItem={deleteItemHandler}
                          onEdtiItem={onEditItemHandler}
                          onIncrementQty={incrementQtyHandler}
                          onDecrementQty={decrementQtyHandler}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full shrink-0 space-y-5 rounded-2xl bg-zinc-50/90 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.10)] ring-1 ring-zinc-200/80 transition-colors duration-300 md:max-w-md lg:w-[340px] xl:w-[380px] dark:bg-zinc-900 dark:ring-zinc-800">
            <button
              className={`w-full rounded-full py-3 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-zinc-900 ${
                hasValidItems
                  ? 'bg-zinc-900 text-zinc-50 hover:bg-black focus:ring-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-white'
                  : 'cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500'
              }`}
              type="submit"
              disabled={!hasValidItems}
              title={!hasValidItems ? 'Add at least one item first' : 'Review invoice'}
            >
              Review invoice
            </button>

            <button
              type="button"
              onClick={clearFormHandler}
              className="w-full rounded-full border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              Clear form
            </button>

            <InvoiceModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              invoiceInfo={{
                businessName,
                invoiceNumber,
                cashierName,
                customerName,
                orderType,
                paymentMethod,
                tableNumber,
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
                  <span className="tabular-nums">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                  <span>Discount</span>
                  <span className="tabular-nums">
                    ({discount || '0'}%) ₹{discountRate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-300">
                  <span>Tax</span>
                  <span className="tabular-nums">
                    ({tax || '0'}%) ₹{taxRate.toFixed(2)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-zinc-50 dark:bg-white dark:text-zinc-900">
                  <span className="font-medium uppercase tracking-[0.18em]">Total</span>
                  <span className="tabular-nums text-base font-semibold">
                    ₹{total.toFixed(2)}
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