import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const formatCurrency = (v) => `₹${Number(v || 0).toFixed(2)}`;

const InvoicePdfExport = ({ invoiceInfo = {}, items = [] }) => {
  const printRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    invoiceNumber = '',
    cashierName = '',
    customerName = '',
    subtotal = 0,
    taxRate = 0,
    discountRate = 0,
    total = 0,
    date = '',
  } = invoiceInfo;

  const validItems = items.filter((item) => item.name.trim().length > 0);

  const hasInvoiceData =
    invoiceNumber !== '' ||
    cashierName.trim() ||
    customerName.trim() ||
    validItems.length > 0;

  const handleDownloadPdf = async () => {
    if (!hasInvoiceData || !printRef.current || isGenerating) return;

    try {
      setIsGenerating(true);

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await new Promise((resolve) => setTimeout(resolve, 300));

      const element = printRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      const safeName = String(invoiceNumber || 'invoice').replace(/[^\w-]+/g, '_');
      pdf.save(`${safeName}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const discountPercent = subtotal > 0 ? ((discountRate / subtotal) * 100).toFixed(1) : '0.0';
  const taxPercent = subtotal > 0 ? ((taxRate / subtotal) * 100).toFixed(1) : '0.0';

  return (
    <>
      <button
        type="button"
        onClick={handleDownloadPdf}
        disabled={!hasInvoiceData || isGenerating}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] shadow-sm transition ${
          hasInvoiceData && !isGenerating
            ? 'bg-zinc-900 text-zinc-50 hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200'
            : 'cursor-not-allowed bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500'
        }`}
      >
        {isGenerating ? 'Generating...' : 'Download PDF'}
      </button>

      <div className="fixed left-[-99999px] top-0 z-[-1]">
        <div
          ref={printRef}
          className="w-[794px] bg-white p-10 text-zinc-900"
          style={{ fontFamily: 'Inter, Arial, sans-serif' }}
        >
          <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-emerald-700 px-10 py-8 text-white">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
                    Invoice
                  </p>
                  <h1 className="mt-2 text-4xl font-bold tracking-tight">
                    #{invoiceNumber || '-'}
                  </h1>
                  <p className="mt-3 text-sm text-zinc-200">
                    Date: <span className="font-semibold text-white">{date || '-'}</span>
                  </p>
                </div>

                <div className="text-right">
                  <h2 className="text-2xl font-bold">Sri Sai Foods</h2>
                  <p className="mt-2 text-sm text-zinc-200">Ranastalam, Andhra Pradesh</p>
                  <p className="text-sm text-zinc-200">Phone: +91 XXXXX XXXXX</p>
                  <p className="text-sm text-zinc-200">GSTIN: XXXXXXXXXXXXXX</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 px-10 py-6">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Billed To
                </p>
                <p className="mt-3 text-lg font-semibold text-zinc-900">
                  {customerName || 'Walk-in Customer'}
                </p>
                <p className="mt-1 text-sm text-zinc-600">
                  Cashier: <span className="font-medium text-zinc-800">{cashierName || '-'}</span>
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-emerald-50 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Summary
                </p>
                <div className="mt-3 space-y-2 text-sm text-zinc-700">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span className="font-semibold text-zinc-900">{validItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-zinc-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({taxPercent}%)</span>
                    <span className="font-semibold text-zinc-900">{formatCurrency(taxRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-semibold text-zinc-900">{formatCurrency(discountRate)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-10 pb-6">
              <div className="overflow-hidden rounded-2xl border border-zinc-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-zinc-100">
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Item
                      </th>
                      <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {validItems.length > 0 ? (
                      validItems.map((item, index) => {
                        const qty = Number(item.qty || 0);
                        const price = Number(item.price || 0);
                        const lineTotal = qty * price;

                        return (
                          <tr key={item.id || index} className="border-t border-zinc-200">
                            <td className="px-4 py-3 text-sm text-zinc-600">{index + 1}</td>
                            <td className="px-4 py-3 text-sm font-medium text-zinc-900">
                              {item.name || '-'}
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-zinc-700">
                              {qty}
                            </td>
                            <td className="px-4 py-3 text-right text-sm text-zinc-700">
                              {formatCurrency(price)}
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-semibold text-zinc-900">
                              {formatCurrency(lineTotal)}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-sm text-zinc-500">
                          No items added
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end px-10 pb-8">
              <div className="w-[320px] overflow-hidden rounded-2xl border border-zinc-200">
                <div className="bg-zinc-50 px-5 py-4">
                  <div className="flex items-center justify-between py-2 text-sm text-zinc-700">
                    <span>Subtotal</span>
                    <span className="font-semibold text-zinc-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm text-zinc-700">
                    <span>Tax</span>
                    <span className="font-semibold text-zinc-900">{formatCurrency(taxRate)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm text-zinc-700">
                    <span>Discount</span>
                    <span className="font-semibold text-zinc-900">{formatCurrency(discountRate)}</span>
                  </div>
                </div>
                <div className="bg-zinc-900 px-5 py-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                      Grand Total
                    </span>
                    <span className="text-xl font-bold">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-200 px-10 py-5 text-center text-xs text-zinc-500">
              <p>Thank you for your order.</p>
              <p className="mt-1">This is a computer-generated invoice.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePdfExport;