
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Player, Sport } from '@/models/types';

export const exportPlayerListToPDF = (players: Player[], sport: Sport) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(`${sport} Players List`, 14, 15);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
  
  // Prepare data for table
  const tableColumn = ["Name", "Age", "Gender", "Contact", "Level", "Sport"];
  const tableRows = players.map(player => [
    player.name,
    player.age.toString(),
    player.gender,
    player.contact,
    player.level,
    player.sport
  ]);
  
  // Generate table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [128, 0, 128] }
  });
  
  // Save PDF
  doc.save(`${sport}_Players.pdf`);
};

export const exportAttendanceListToPDF = (players: Player[], sport: Sport) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(`${sport} Attendance Report`, 14, 15);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
  
  // Prepare data for table
  const tableColumn = ["Name", "Level", "Sport", "Attendance"];
  const tableRows = players.map(player => [
    player.name,
    player.level,
    player.sport,
    player.attendance === true ? "Present" : player.attendance === false ? "Absent" : "Not Marked"
  ]);
  
  // Generate table
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [128, 0, 128] }
  });
  
  // Save PDF
  doc.save(`${sport}_Attendance.pdf`);
};
