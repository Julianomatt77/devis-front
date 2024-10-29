'use client';

import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/cards";
import Modal from "@/components/ui/modal";
import {useEffect, useState} from "react";
import {getPrestations} from "@/lib/data/data-prestations";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPrestation, setSelectedPrestation] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getPrestations();
            if (result.ok) {
                const fetchedPrestations = result.data;
                setData(fetchedPrestations);
            }
        }
        fetchData();
    }, []);

    const refreshData = async () => {
        const result = await getPrestations();
        if (result.ok) {
            const updatedPrestations = result.data;
            setData(updatedPrestations);
        }
    };

    const openEditModal = (prestation) => {
        setSelectedPrestation(prestation);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPrestation(null);
    };

    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Prestations</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouvelle prestation</Button>
                </div>
                <CardWrapper
                    data={data}
                    onEditData={openEditModal}
                    type="prestation"
                    isDashboard={false}
                    refreshData={refreshData}
                />

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <PrestationForm
                            onSubmit={closeModal}
                            clientData={selectedPrestation}
                            isEditMode={!!selectedPrestation}
                            refreshData={refreshData}
                        />
                    </Modal>
                )}
            </div>
        </main>
    );
}