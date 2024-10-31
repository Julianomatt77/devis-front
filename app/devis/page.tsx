'use client';

import {useEffect, useState} from "react";
import {getDevis} from "@/lib/data/data-devis";
import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/cards";
import Modal from "@/components/ui/modal";
import DevisForm from "@/components/forms/devis-form";
import {redirect} from "next/navigation";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDevis, setSelectedDevis] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getDevis();
            if (result.ok) {
                const fetchedDevis = result.data;
                // On filtre les devis supprimés
                const activeDevis = fetchedDevis.filter((devis) => !devis.deletedAt)
                setData(activeDevis);
            }
        }
        fetchData();
    }, []);

    const refreshData = async () => {
        const result = await getDevis();
        if (result.ok) {
            const updatedDevis = result.data;
            const activeDevis = updatedDevis.filter((devis) => !devis.deletedAt)
            setData(activeDevis);
        }
    };

    const openEditModal = (devis) => {
        setSelectedDevis(devis);
        // setIsModalOpen(true);
        redirect(`/devis/${devis.id}`);
    };

    const closeModal = (devis) => {
        if (devis.id) {
            setSelectedDevis(devis);
            console.log(devis)
        }
        setIsModalOpen(false);
        setSelectedDevis(null);
    };

    return (
        <main className="w-full p-4 shadow sm:p-8">
            <div className="flex items-center justify-center mb-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Devis</h1>
                </div>
            </div>
            <CardWrapper
                data={data}
                onEditData={openEditModal} //TODO :changer en voir le devis
                type="devis"
                isDashboard={false}
                refreshData={refreshData}
            />

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <DevisForm
                        onSubmit={closeModal}
                        devisData={selectedDevis}
                        isEditMode={!!selectedDevis}
                        refreshData={refreshData}
                    />
                </Modal>
            )}
        </main>
    )

}