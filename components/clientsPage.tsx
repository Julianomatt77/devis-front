'use client';
import {useState} from "react";
import CardWrapper from "@/components/cards";
import {Button} from "@/components/ui/button";
import ClientForm from "@/components/forms/client-form";
import Modal from "@/components/ui/modal";

export default function ClientsPage({data}: {data: any}) {
    // État pour ouvrir/fermer le popup
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour ouvrir/fermer la modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <main className="flex items-center justify-center p-4">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Clients</h1>
                </div>
                <div>
                    <Button onClick={toggleModal}>Nouveau client</Button>
                </div>
                <CardWrapper data={data} type="client" isDashboard={false} />

                 {/*Modal pour ajouter un client*/}
                {isModalOpen && (
                    <Modal onClose={toggleModal}>
                        <ClientForm onSubmit={toggleModal} />
                    </Modal>
                )}
            </div>
        </main>
    );
}
