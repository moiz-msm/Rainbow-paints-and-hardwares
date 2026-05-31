import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order } from '../store/useOrderStore';

export const generateInvoice = (order: Order) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59); // Tailwind slate-800
  doc.text('TAX INVOICE', 14, 22);
  
  // Brand
  doc.setFontSize(16);
  doc.setTextColor(212, 175, 55); // Gold color
  doc.text('Rainbow Paints & Hardwares', 14, 32);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text('Established in 2001', 14, 38);
  doc.text('Authorized Dealer: Asian Paints & Berger Paints', 14, 43);
  doc.text('3 Branches in Coimbatore', 14, 48);

  // Invoice Details (Right side)
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(`Invoice No: INV-${order.id}`, 130, 32);
  doc.text(`Order ID: ${order.id}`, 130, 38);
  doc.text(`Date: ${new Date(order.date).toLocaleDateString('en-IN')}`, 130, 44);
  doc.text(`Payment: ${order.paymentMethod} (Paid)`, 130, 50);

  // Billing & Shipping
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('Billed To / Delivered To:', 14, 65);
  doc.setFontSize(10);
  doc.text(order.shippingAddress.name, 14, 72);
  doc.text(order.shippingAddress.line1, 14, 77);
  if (order.shippingAddress.landmark) {
    doc.text(`Landmark: ${order.shippingAddress.landmark}`, 14, 82);
    doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`, 14, 87);
    doc.text(`Phone: ${order.shippingAddress.phone}`, 14, 92);
    if (order.shippingAddress.email) {
      doc.text(`Email: ${order.shippingAddress.email}`, 14, 97);
    }
  } else {
    doc.text(`${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`, 14, 82);
    doc.text(`Phone: ${order.shippingAddress.phone}`, 14, 87);
    if (order.shippingAddress.email) {
      doc.text(`Email: ${order.shippingAddress.email}`, 14, 92);
    }
  }

  // Items Table
  const tableData = order.items.map((item, index) => [
    index + 1,
    `${item.name}\n${item.brand}${item.shade ? `\nShade: ${item.shade.name} ${item.shade.code ? `(${item.shade.code})` : ''}` : ''}`,
    `${item.size}L`,
    item.quantity,
    `Rs. ${(item.unitPrice * item.size).toFixed(2)}`,
    `Rs. ${(item.unitPrice * item.size * item.quantity).toFixed(2)}`
  ]);

  autoTable(doc, {
    startY: 105,
    head: [['#', 'Item Description', 'Size', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
    styles: { fontSize: 9, cellPadding: 4 },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 70 },
      2: { cellWidth: 20 },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 35, halign: 'right' },
      5: { cellWidth: 35, halign: 'right' }
    }
  });

  // Summary Table
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  autoTable(doc, {
    startY: finalY,
    body: [
      ['Subtotal:', `Rs. ${order.subtotal.toFixed(2)}`],
      ['GST (18%):', `Rs. ${order.gst.toFixed(2)}`],
      ['Delivery Charges:', order.deliveryFee === 0 ? 'FREE' : `Rs. ${order.deliveryFee.toFixed(2)}`],
      ['Total Amount Paid:', `Rs. ${order.total.toFixed(2)}`]
    ],
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 2, halign: 'right' },
    columnStyles: {
      0: { cellWidth: 140, fontStyle: 'bold' },
      1: { cellWidth: 45, fontStyle: 'bold' }
    }
  });

  // Footer
  const footerY = doc.internal.pageSize.height - 20;
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('This is a computer generated invoice and does not require a physical signature.', 14, footerY);
  doc.text('Thank you for shopping with Rainbow Paints!', 14, footerY + 5);

  // Save the PDF
  doc.save(`Invoice_${order.id}.pdf`);
};
