import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const formatCurrency = (value) => `₹${Number(value || 0).toFixed(2)}`;

const badgeColor = (label) => {
  switch (label) {
    case 'Dine-in':
      return { bg: '#ecfdf5', text: '#047857' };
    case 'Takeaway':
      return { bg: '#fffbeb', text: '#b45309' };
    case 'Cash':
      return { bg: '#f4f4f5', text: '#3f3f46' };
    case 'Card':
      return { bg: '#eff6ff', text: '#1d4ed8' };
    case 'UPI':
      return { bg: '#fdf4ff', text: '#a21caf' };
    default:
      return { bg: '#f4f4f5', text: '#3f3f46' };
  }
};

const InvoicePdfExport = ({ invoiceInfo, items }) => {
  const invoiceRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current) return;

    try {
      setIsGenerating(true);

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const orderBadge = badgeColor(invoiceInfo.orderType);
  const paymentBadge = badgeColor(invoiceInfo.paymentMethod);

  return (
    <>
      <button
        type="button"
        onClick={handleDownloadPdf}
        disabled={isGenerating}
        className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] shadow-sm transition ${
          isGenerating
            ? 'cursor-not-allowed bg-zinc-300 text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400'
            : 'bg-emerald-500 text-white hover:bg-emerald-600'
        }`}
      >
        {isGenerating ? 'Generating...' : 'Download PDF'}
      </button>

      <div className="fixed left-[-9999px] top-0 z-[-1]">
        <div
          ref={invoiceRef}
          className="w-[794px] bg-white p-8 text-black"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          <div className="mb-6 border-b border-zinc-300 pb-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600">
                  Restaurant invoice
                </p>
                <h1 className="mt-2 text-3xl font-bold text-zinc-900">
                  {invoiceInfo.businessName || 'Business Name'}
                </h1>
                <p className="mt-3 text-sm text-zinc-600">
                  Invoice No: #{invoiceInfo.invoiceNumber}
                </p>
                <p className="text-sm text-zinc-600">Date: {invoiceInfo.date}</p>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Cashier
                </p>
                <p className="text-sm font-semibold text-zinc-900">
                  {invoiceInfo.cashierName || '-'}
                </p>

                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Customer
                </p>
                <p className="text-sm font-semibold text-zinc-900">
                  {invoiceInfo.customerName || '-'}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-8">
              <span
                style={{ backgroundColor: orderBadge.bg, color: orderBadge.text }}
                className="rounded-full px-3 py-1 text-xs font-semibold"
              >
                {invoiceInfo.orderType}
              </span>

              <span
                style={{ backgroundColor: paymentBadge.bg, color: paymentBadge.text }}
                className="rounded-full px-3 py-1 text-xs font-semibold"
              >
                {invoiceInfo.paymentMethod}
              </span>

              {invoiceInfo.orderType === 'Dine-in' && (
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                  Table: {invoiceInfo.tableNumber || '-'}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6 overflow-hidden rounded-lg border border-zinc-300">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zinc-100">
                  <th className="border-b border-zinc-300 px-4 py-3 text-left text-sm font-semibold text-zinc-700">
                    Item
                  </th>
                  <th className="border-b border-zinc-300 px-4 py-3 text-center text-sm font-semibold text-zinc-700">
                    Qty
                  </th>
                  <th className="border-b border-zinc-300 px-4 py-3 text-right text-sm font-semibold text-zinc-700">
                    Price
                  </th>
                  <th className="border-b border-zinc-300 px-4 py-3 text-right text-sm font-semibold text-zinc-700">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.length > 0 ? (
                  items.map((item, index) => {
                    const qty = Number(item.qty || 0);
                    const price = Number(item.price || 0);
                    const lineTotal = qty * price;

                    return (
                      <tr key={item.id}>
                        <td className="border-b border-zinc-200 px-4 py-3 text-sm text-zinc-800">
                          {index + 1}. {item.name}
                        </td>
                        <td className="border-b border-zinc-200 px-4 py-3 text-center text-sm text-zinc-800">
                          {qty}
                        </td>
                        <td className="border-b border-zinc-200 px-4 py-3 text-right text-sm text-zinc-800">
                          {formatCurrency(price)}
                        </td>
                        <td className="border-b border-zinc-200 px-4 py-3 text-right text-sm font-medium text-zinc-900">
                          {formatCurrency(lineTotal)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-sm text-zinc-500"
                    >
                      No items added.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="ml-auto w-[320px] space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-sm">
              <span className="text-zinc-600">Subtotal</span>
              <span className="font-medium text-zinc-900">
                {formatCurrency(invoiceInfo.subtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-sm">
              <span className="text-zinc-600">
                Discount ({((invoiceInfo.discountRate / (invoiceInfo.subtotal || 1)) * 100 || 0).toFixed(1)}%)
              </span>
              <span className="font-medium text-zinc-900">
                - {formatCurrency(invoiceInfo.discountRate)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-sm">
              <span className="text-zinc-600">
                Tax ({((invoiceInfo.taxRate / (invoiceInfo.subtotal || 1)) * 100 || 0).toFixed(1)}%)
              </span>
              <span className="font-medium text-zinc-900">
                + {formatCurrency(invoiceInfo.taxRate)}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-zinc-900 px-4 py-3 text-base font-bold text-white">
              <span>Total</span>
              <span>{formatCurrency(invoiceInfo.total)}</span>
            </div>
          </div>

          <div className="mt-10 border-t border-zinc-300 pt-4 text-center text-xs text-zinc-500">
            <p>Thank you for dining with us.</p>
            <p className="mt-1">Payment method: {invoiceInfo.paymentMethod}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePdfExport;