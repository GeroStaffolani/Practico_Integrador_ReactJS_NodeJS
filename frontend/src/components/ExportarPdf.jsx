import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ExportarPdf({ data, columns, title }) {
  const exportar = () => {
    const doc = new jsPDF();
    doc.text(title, 14, 10);
    doc.autoTable({
      startY: 20,
      head: [columns],
      body: data.map(item => columns.map(col => item[col])),
    });
    doc.save(`${title}.pdf`);
  };

  return <button className="btn btn-outline-dark" onClick={exportar}>Exportar PDF</button>;
}

export default ExportarPdf;