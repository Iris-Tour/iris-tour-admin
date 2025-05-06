"use client";

import Button3 from "@/components/buttons/Button3";
import { DocumentUpload, Printer } from "iconsax-react";
import { Trans } from "react-i18next";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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
            // Créer le contenu CSV
            const headers = columns.map((col) => col.header);
            const rows = data.map((item) =>
                columns.map((col) => {
                    const value = item[col.key];
                    return col.render ? col.render(value) : value;
                })
            );

            const csvContent = [
                headers.join(","),
                ...rows.map((row) => row.join(",")),
            ].join("\n");

            // Créer et télécharger le fichier
            const blob = new Blob([csvContent], {
                type: "text/csv;charset=utf-8;",
            });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute(
                "download",
                `${fileName}_${format(new Date(), "yyyy-MM-dd", {
                    locale: fr,
                })}.csv`
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
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
