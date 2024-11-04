'use client';

import { useState } from 'react';
import Modal from "@/components/ui/modal";
import DevisForm from "@/components/forms/devis-form";
import {deleteDevis, getOneDevis} from "@/lib/data/data-devis";
import {redirect, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function ModalTrigger({ devisData, id }: { devisData: any, id: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        const timestamp = new Date().getTime();
        router.push(`?updated=${timestamp}`); // Change le paramètre pour forcer le rechargement des données
    };

    const refreshData = async () => {
        const result = await getOneDevis(id);
        if (result.ok) {
            console.log("Données actualisées :", result.data);
        } else {
            console.error(result.message);
        }
    };

    const deleteData = async () => {
        const result = await deleteDevis(id);
        if (result.ok) {
            redirect(`/devis`);
        } else {
            console.error(result.message);
        }
    }

    return (
        <>
            <div className={"flex gap-4"}>
                <Button onClick={openModal}>Modifier</Button>
                <Button onClick={deleteData} variant="destructive">Supprimer</Button>
            </div>


            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <DevisForm
                        onSubmit={() => {
                            closeModal();
                            // refreshData();
                        }}
                        devisData={devisData}
                        isEditMode={!!devisData}
                    />
                </Modal>
            )}
        </>
    );
}
