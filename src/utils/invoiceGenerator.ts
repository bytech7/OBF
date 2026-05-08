import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface InvoiceData {
  orderNumber: string;
  date: string;
  customerName: string;
  items: {
    name: string;
    quantity: number;
    price: string;
    total: number;
  }[];
  totalAmount: number;
}

const formatFCFA = (amount: number | string) => {
  const num = typeof amount === 'string' ? parseInt(amount.replace(/[^0-9]/g, '')) : amount;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " FCFA";
};

export const generateInvoicePDF = (data: InvoiceData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Color Palette (Luxury theme)
  const gold = [197, 165, 114]; // #C5A572
  const ink = [27, 31, 30]; // #1B1F1E
  const lightGrey = [248, 247, 242]; // #F8F7F2

  // Header Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, 70, "F");

  // Logo / Branding
  doc.addImage("/PHOTO-2026-04-28-14-16-16-removebg-preview.png", "PNG", 15, 10, 50, 40);
  
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("MAISON ARTISANALE • HAUTE FLEURISTERIE", 75, 33);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("KRIBI, CAMEROUN", 75, 39);
  doc.text("Tél: +237 6 97 30 94 41", 75, 45);
  doc.text("Email: obellefleurs@gmail.com", 75, 51);

  // Invoice Title
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("FACTURE & BON DE COMMANDE", 20, 90);
  
  // Thin decorative line
  doc.setDrawColor(gold[0], gold[1], gold[2]);
  doc.setLineWidth(0.5);
  doc.line(20, 95, 80, 95);

  // Left Column: Order Info
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "bold");
  doc.text("DÉTAILS COMMANDE", 20, 105);
  
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.setFont("helvetica", "normal");
  doc.text(`N° Commande:`, 20, 112);
  doc.setFont("helvetica", "bold");
  doc.text(data.orderNumber, 50, 112);
  
  doc.setFont("helvetica", "normal");
  doc.text(`Date:`, 20, 118);
  doc.text(data.date, 50, 118);
  
  doc.text(`Client:`, 20, 124);
  doc.text(data.customerName, 50, 124);

  // Right Column: Company Info
  const rightColumnX = pageWidth - 80;
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "bold");
  doc.text("ÉMIS PAR", rightColumnX, 105);
  
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.setFont("helvetica", "bold");
  doc.text("Ô Belles Fleurs Boutique", rightColumnX, 112);
  doc.setFont("helvetica", "normal");
  doc.text("Quartier Administratif", rightColumnX, 118);
  doc.text("Kribi, Cameroun", rightColumnX, 124);
  doc.text("Tél: +237 6 97 30 94 41", rightColumnX, 130);

  // Table
  const tableData = data.items.map(item => [
    item.name,
    item.quantity.toString(),
    formatFCFA(item.price),
    formatFCFA(item.total)
  ]);

  autoTable(doc, {
    startY: 140,
    head: [["Désignation", "Qté", "Prix Unitaire", "Total"]],
    body: tableData,
    headStyles: { 
      fillColor: [gold[0], gold[1], gold[2]], 
      textColor: [255, 255, 255], 
      fontStyle: 'bold',
      halign: 'center',
      fontSize: 10
    },
    columnStyles: {
      0: { cellWidth: 'auto', fontStyle: 'bold' },
      1: { halign: 'center', cellWidth: 20 },
      2: { halign: 'right', cellWidth: 45 },
      3: { halign: 'right', cellWidth: 45, fontStyle: 'bold' },
    },
    styles: { 
      font: "helvetica", 
      fontSize: 9,
      cellPadding: 6,
      lineColor: [230, 230, 230],
      lineWidth: 0.1
    },
    alternateRowStyles: {
      fillColor: [lightGrey[0], lightGrey[1], lightGrey[2]]
    },
    margin: { left: 20, right: 20 }
  });

  // Summary Section
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  const summaryX = pageWidth - 90;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Sous-total:", summaryX, finalY);
  doc.text(formatFCFA(data.totalAmount), pageWidth - 20, finalY, { align: "right" });
  
  doc.text("Livraison:", summaryX, finalY + 7);
  doc.text("0 FCFA", pageWidth - 20, finalY + 7, { align: "right" });
  
  // Total Box
  doc.setFillColor(ink[0], ink[1], ink[2]);
  doc.rect(summaryX - 5, finalY + 12, 75, 12, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("TOTAL NET:", summaryX, finalY + 20);
  doc.text(formatFCFA(data.totalAmount), pageWidth - 25, finalY + 20, { align: "right" });

  // Payment Note
  doc.setTextColor(ink[0], ink[1], ink[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("Note: Le paiement s'effectue à la livraison ou via Orange/MTN Money.", 20, finalY + 40);

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 25;
  doc.setDrawColor(230, 230, 230);
  doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  const footerLines = [
    "Ô Belles Fleurs - RCCM: XX/XXX/XXX - Contribuable: XXXXXXXXX",
    "Kribi, Cameroun - Services disponibles dans tout le pays",
    "Merci pour votre confiance en l'excellence artisanale."
  ];
  
  footerLines.forEach((line, index) => {
    doc.text(line, pageWidth / 2, footerY + (index * 4), { align: "center" });
  });

  // Download
  doc.save(`Facture_${data.orderNumber}.pdf`);
};
