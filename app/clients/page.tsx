'use client';
import {useEffect, useState} from "react";
import CardWrapper from "@/components/cards";
import {Button} from "@/components/ui/button";
import ClientForm from "@/components/forms/client-form";
import Modal from "@/components/ui/modal";
import {getClients} from "@/lib/data/data-clients";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedClients = await getClients();
            setData(fetchedClients);
        }
        fetchData();
    }, []);

    const refreshData = async () => {
        const updatedClients = await getClients();
        setData(updatedClients);
    };

    const openEditModal = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedClient(null);
    };

    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Clients</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouveau client</Button>
                </div>
                <CardWrapper
                    data={data}
                    onEditClient={openEditModal}
                    type="client"
                    isDashboard={false}
                    refreshData={refreshData}
                    // onDeleteClient={deleteClient}
                />

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <ClientForm
                            onSubmit={closeModal}
                            clientData={selectedClient}
                            isEditMode={!!selectedClient}
                            refreshData={refreshData}
                        />
                    </Modal>
                )}
            </div>
        </main>
    );
}
