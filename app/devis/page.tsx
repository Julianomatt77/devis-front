'use client';

import {useEffect, useState} from "react";
import {getDevis} from "@/lib/data/data-devis";
import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/cards";
import Modal from "@/components/ui/modal";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDevis, setSelectedDevis] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getDevis();
            if (result.ok) {
                const fetchedDevis = result.data;
                setData(fetchedDevis);
            }
        }
        fetchData();
    }, []);

    const refreshData = async () => {
        const result = await getDevis();
        if (result.ok) {
            const updatedDevis = result.data;
            setData(updatedDevis);
        }
    };

    const openEditModal = (devis) => {
        setSelectedDevis(devis);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDevis(null);
    };

    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Devis</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouveau devis</Button>
                </div>
                <CardWrapper
                    data={data}
                    onEditData={openEditModal}
                    type="devis"
                    isDashboard={false}
                    refreshData={refreshData}
                />

                {isModalOpen && (
                    // TODO: Afficher une autre page plutôt avec mise en page comme pour single?
                    <Modal onClose={closeModal}>
                        <DevisForm
                            onSubmit={closeModal}
                            entrepriseData={selectedDevis}
                            isEditMode={!!selectedDevis}
                            refreshData={refreshData}
                        />
                    </Modal>
                )}
            </div>
        </main>
    );

}