import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateShoppingPDF = (list, ingredientsData) => {
  if (!list || !list.items) {
    console.error("List or items missing!");
    return;
  }

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.setTextColor(22, 163, 74);
  doc.text("PrepPal Shopping List", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    `Plan ID: #${list.planId} | Date: ${new Date().toLocaleDateString()}`,
    14,
    30
  );

  const tableRows = list.items.map((item) => {
    const ing = ingredientsData.find((i) => i.id === item.ingredientId);
    return [
      ing?.name || "Unknown Item",
      item.amount || 0,
      ing?.unit || "",
      "[  ]",
    ];
  });

  autoTable(doc, {
    startY: 40,
    head: [["Ingredient", "Qty", "Unit", "Done"]],
    body: tableRows,
    theme: "striped",
    headStyles: {
      fillColor: [22, 163, 74],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    columnStyles: {
      3: { halign: "center" },
    },
  });

  doc.save(`ShoppingList-Plan-${list.planId}.pdf`);
};
