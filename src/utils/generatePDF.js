import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateShoppingPDF = (list, ingredientsData, planTitle = "") => {
  if (!list || !list.items || !Array.isArray(ingredientsData)) {
    console.error("List of items is empty");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(22, 163, 74);
  doc.text("PrepPal Shopping List", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(80);
  doc.text(`${planTitle || "My Meal Plan"}`, 14, 30);

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 37);

  const tableRows = list.items.map((item) => {
    const ing = ingredientsData.find((i) => i.id === item.ingredient_id);
    const cleanUnit = ing?.unit ? ing.unit.replace(/[0-9]/g, "") : "";
    return [
      ing?.name || "Unknown Item",
      `${item.amount || 0} ${cleanUnit || ""}`,
    ];
  });

  autoTable(doc, {
    startY: 45,
    head: [["Ingredient", "Quantity"]],
    body: tableRows,
    theme: "striped",
    headStyles: {
      fillColor: [22, 163, 74],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 11,
      cellPadding: 6,
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 40, halign: "right", fontStyle: "bold" },
    },
  });

  const fileName = planTitle ? planTitle.replace(/\s+/g, "-") : "shopping-list";
  doc.save(`PrepPal-${fileName}.pdf`);
};
