import jsPDF from "jspdf";

export function generateCertificate({ name, tier }) {
  const doc = new jsPDF("landscape");

  let title = "Certificate of Achievement";
  let subtitle = "";
  let color = "#3b82f6";

  if (tier === 1) {
    subtitle = "For completing 100 XP";
  } else if (tier === 2) {
    subtitle = "For reaching advanced progress";
    color = "#9333ea";
  } else if (tier === 3) {
    subtitle = "Elite Performance Award";
    color = "#f59e0b";
  }

  doc.setFillColor(240, 240, 240);
  doc.rect(0, 0, 300, 200, "F");

  doc.setTextColor(color);
  doc.setFontSize(28);
  doc.text(title, 150, 60, { align: "center" });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.text(name, 150, 90, { align: "center" });

  doc.setFontSize(14);
  doc.text(subtitle, 150, 110, { align: "center" });

  const date = new Date().toLocaleDateString();
  doc.setFontSize(12);
  doc.text(`Date: ${date}`, 150, 130, { align: "center" });

  doc.save(`certificate-${tier}.pdf`);
}
