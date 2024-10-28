'use client';
import {useEffect, useState} from "react";
import CardWrapper from "@/components/cards";
import {Button} from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import {getAdresses} from "@/lib/data/data-adresses";
import AdresseForm from "@/components/forms/adresse-form";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdresse, setSelectedAdresse] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getAdresses();
            if (result.ok) {
                const fetchedAdresses = result.data;
                setData(fetchedAdresses);
            }
        }
        fetchData();
    }, []);

    const refreshData = async () => {
        const result = await getAdresses();
        if (result.ok) {
            const updatedAdresses = result.data;
            setData(updatedAdresses);
        }
    };

    const openEditModal = (client) => {
        setSelectedAdresse(client);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAdresse(null);
    };

    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Carnet d'adresses</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouvelle adresse</Button>
                </div>
                <CardWrapper
                    data={data}
                    onEditData={openEditModal}
                    type="adresse"
                    isDashboard={false}
                    refreshData={refreshData}
                    // onDeleteClient={deleteClient}
                />

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <AdresseForm
                            onSubmit={closeModal}
                            data={selectedAdresse}
                            isEditMode={!!selectedAdresse}
                            refreshData={refreshData}
                        />
                    </Modal>
                )}
            </div>
        </main>
    );
}
