"use client";

// import { PDFDownloadLink } from '@react-pdf/renderer';
// import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import {useRouter} from "next/navigation";
import jsPDF from 'jspdf';
import {useRef} from "react";
import html2canvas from "html2canvas";
// import 'jspdf-autotable';
// import DevisPdfDocument from "@/components/DevisPdfDocument";
// import {useRef} from "react";
// import html2canvas from "html2canvas";
// import * as jsPDF from "jspdf";

// Puppeter
// const PDFExportButton = ({ id }: { id: number }) => {
//     const router = useRouter()
//
//     const handlePDFDownload = async () => {
//         // router.push(`/export?id=${id}`);
//         // window.open(`/api/generate-pdf?id=${id}`, '_blank');
//         window.open(`/devis/${id}/export`, '_blank');
//     };
//
//     return <Button onClick={handlePDFDownload}>Exporter en PDF</Button>;
// };

const PDFExportButton = ({ devis, prixHtCalcule, tvaCalcule, totalTTCCalcule, entrepriseAdresseRue, entrepriseAdresseVille, clientAdresseRue, clientAdresseVille, id }) => {
    const handleGeneratePDF = async () => {
        const contentElement = document.getElementById(`devis-${id}`);
        if (contentElement) {
            const canvas = await html2canvas(contentElement, {
                scale: 2, // Augmente la résolution pour une meilleure qualité
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
            pdf.save(`devis_${devis.reference}.pdf`);
        } else {
            console.error('Element non trouvé.');
        }
    };

    return (
        <Button onClick={handleGeneratePDF} className="mt-4 p-2 rounded">
            Télécharger le PDF
        </Button>
    );
};

// export default PDFExportButton;

//
// export default function PDFExportButton({
//                                             devis = {},
//                                             prixHtCalcule = '',
//                                             tvaCalcule = '',
//                                             totalTTCCalcule = '',
//                                             entrepriseAdresseRue = '',
//                                             entrepriseAdresseVille = '',
//                                             clientAdresseRue = '',
//                                             clientAdresseVille = ''
//     }) {
//
//
//
//     const pdfContentRef = useRef<HTMLDivElement>(null);
//
//     // Fonction pour générer le PDF
//     // const handleExportPDF = async () => {
//     //     if (pdfContentRef.current) {
//     //         const canvas = await html2canvas(pdfContentRef.current);
//     //         const imgData = canvas.toDataURL('image/png');
//     //         const pdf = new jsPDF({
//     //             orientation: 'portrait',
//     //             unit: 'pt',
//     //             format: 'a4',
//     //         });
//     //         pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
//     //         pdf.save('document.pdf');
//     //     }
//     // };
//
//     if (!devis) {
//         return (<Button>Pas de devis</Button>);
//     }
//
//     return (
//         <div>
//             {/*<Button onClick={handleExportPDF}>Exporter en PDF</Button>*/}
//             <Button>Exporter en PDF</Button>
//             {/*<div ref={pdfContentRef} id="pdf-content" className={'hidden'}>*/}
//             {/*    /!* Passez les props nécessaires au composant *!/*/}
//             {/*    <DevisPdfDocument*/}
//             {/*        devis={{}}*/}
//             {/*        prixHtCalcule="1000"*/}
//             {/*        tvaCalcule="200"*/}
//             {/*        totalTTCCalcule="1200"*/}
//             {/*        entrepriseAdresseRue="123 Rue de l'Entreprise"*/}
//             {/*        entrepriseAdresseVille="75000 Paris"*/}
//             {/*        clientAdresseRue="456 Rue du Client"*/}
//             {/*        clientAdresseVille="75000 Lyon"*/}
//             {/*    />*/}
//             {/*</div>*/}
//         </div>
//     )
// // console.log(devis);
// // console.log(prixHtCalcule);
// // console.log(tvaCalcule);
// // console.log(totalTTCCalcule);
// // console.log(entrepriseAdresseRue);
// // console.log(entrepriseAdresseVille);
// // console.log(clientAdresseRue);
// // console.log(clientAdresseVille);
//     // return (
//     //     <Button>devis</Button>
//     // )
//     // return (
//     //     <PDFDownloadLink
//     //         // document={<DevisPdfDocument
//     //         //     devis={devis}
//     //         //     prixHtCalcule={prixHtCalcule}
//     //         //     tvaCalcule={tvaCalcule}
//     //         //     totalTTCCalcule={totalTTCCalcule}
//     //         //     entrepriseAdresseRue={entrepriseAdresseRue}
//     //         //     entrepriseAdresseVille={entrepriseAdresseVille}
//     //         //     clientAdresseRue={clientAdresseRue}
//     //         //     clientAdresseVille={clientAdresseVille}
//     //         // />}
//     //         document={<DevisPdfDocument
//     //
//     //         />}
//     //         fileName={`devis-${devis.reference}.pdf`}
//     //     >
//     //         {({ loading }) => (loading ? 'Génération du PDF...' : <Button>Exporter en PDF</Button>)}
//     //     </PDFDownloadLink>
//     // );
// }

// const MyDoc = () => (
//     <Document>
//         <Page>
//             Hello World
//         </Page>
//     </Document>
// );
//
// const PDFExportButton = () => (
//     <div>
//         <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
//             {({ blob, url, loading, error }) =>
//                 loading ? 'Loading document...' : 'Download now!'
//             }
//         </PDFDownloadLink>
//     </div>
// );
//
// export default PDFExportButton;
