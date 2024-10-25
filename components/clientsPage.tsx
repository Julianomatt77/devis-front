'use client';
import {useState} from "react";
import CardWrapper from "@/components/cards";
import {Button} from "@/components/ui/button";
import ClientForm from "@/components/forms/client-form";
import Modal from "@/components/ui/modal";

export default function ClientsPage({data}: {data: any}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

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
                <CardWrapper data={data} onEditClient={openEditModal} type="client" isDashboard={false} />

                {isModalOpen && (
                    <Modal onClose={closeModal}>
                        <ClientForm
                            onSubmit={closeModal}
                            clientData={selectedClient}
                            isEditMode={!!selectedClient}
                        />
                    </Modal>
                )}
            </div>
        </main>
    );
}
