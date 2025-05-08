"use client";

import Button3 from "@/components/buttons/Button3";
import { DocumentUpload, Printer } from "iconsax-react";
import { Trans } from "react-i18next";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface Column {
    key: string;
    header: string;
    render?: (value: any) => string;
}

interface ExportPrintButtonsProps {
    data: any[];
    columns: Column[];
    fileName: string;
    title: string;
    className?: string;
}

const ExportPrintButtons = ({
    data,
    columns,
    fileName,
    title,
    className = "",
}: ExportPrintButtonsProps) => {
    const handleExport = (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const doc = new jsPDF();

            // Ajouter le titre
            doc.setFontSize(16);
            doc.text(title, 14, 15);

            // Ajouter la date
            doc.setFontSize(10);
            doc.text(
                `Date d'exportation: ${format(new Date(), "dd MMMM yyyy", {
                    locale: fr,
                })}`,
                14,
                25
            );

            // Préparer les données pour le tableau
            const tableData = data.map((item) =>
                columns.map((col) => {
                    const value = item[col.key];
                    return col.render ? col.render(value) : value;
                })
            );

            // Générer le tableau
            autoTable(doc, {
                head: [columns.map((col) => col.header)],
                body: tableData,
                startY: 30,
                styles: {
                    fontSize: 8,
                    cellPadding: 2,
                },
                headStyles: {
                    fillColor: [66, 66, 66],
                    textColor: 255,
                    fontStyle: "bold",
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245],
                },
                margin: { top: 30 },
            });

            // Télécharger le PDF
            doc.save(
                `${fileName}_${format(new Date(), "yyyy-MM-dd", {
                    locale: fr,
                })}.pdf`
            );
        } catch (error) {
            console.error("Erreur lors de l'exportation:", error);
            alert("Une erreur est survenue lors de l'exportation.");
        }
    };

    const handlePrint = (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const printWindow = window.open("", "_blank");
            if (!printWindow) {
                alert(
                    "Veuillez autoriser les popups pour cette fonctionnalité."
                );
                return;
            }

            const content = `
                <html>
                    <head>
                        <title>${title}</title>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f5f5f5; }
                            @media print {
                                body { padding: 20px; }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${title}</h1>
                        <p>Date d'impression: ${format(
                            new Date(),
                            "dd MMMM yyyy",
                            {
                                locale: fr,
                            }
                        )}</p>
                        <table>
                            <thead>
                                <tr>
                                    ${columns
                                        .map((col) => `<th>${col.header}</th>`)
                                        .join("")}
                                </tr>
                            </thead>
                            <tbody>
                                ${data
                                    .map(
                                        (item) => `
                                    <tr>
                                        ${columns
                                            .map(
                                                (col) => `
                                            <td>${
                                                col.render
                                                    ? col.render(item[col.key])
                                                    : item[col.key]
                                            }</td>
                                        `
                                            )
                                            .join("")}
                                    </tr>
                                `
                                    )
                                    .join("")}
                            </tbody>
                        </table>
                    </body>
                </html>
            `;

            printWindow.document.write(content);
            printWindow.document.close();
            printWindow.print();
        } catch (error) {
            console.error("Erreur lors de l'impression:", error);
            alert("Une erreur est survenue lors de l'impression.");
        }
    };

    const isDisabled = data.length === 0;

    return (
        <div className={`flex gap-4 ${className}`}>
            <Button3 onClick={handleExport} disabled={isDisabled}>
                <Trans i18nKey={"tours.export"} />
                <DocumentUpload
                    className={`${
                        isDisabled ? "stroke-gray-400" : "stroke-black"
                    }`}
                />
            </Button3>
            <Button3 onClick={handlePrint} disabled={isDisabled}>
                <Trans i18nKey={"tours.print"} />
                <Printer
                    className={`${
                        isDisabled ? "stroke-gray-400" : "stroke-black"
                    }`}
                />
            </Button3>
        </div>
    );
};

export default ExportPrintButtons;
