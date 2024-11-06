'use client';

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Modal from "@/components/ui/modal";
import PrestationForm from "@/components/forms/prestation-form";
import {deletePrestation} from "@/lib/data/data-prestations";
import WarningModal from "@/components/WarningModal";
import {PenLine, Trash2} from "lucide-react";

export default function PrestationModalTrigger({ isEditPrestation, id }: { isEditPrestation, id: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const [selectedPrestation, setSelectedPrestation] = useState(null);
    const router = useRouter()

    // const openModal = () => setIsModalOpen(true);
    const openModal = (prestation) => {
        setSelectedPrestation(prestation);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPrestation(null);

        const timestamp = new Date().getTime();
        router.push(`?updated=${timestamp}`); // Change le paramètre pour forcer le rechargement des données
    };

    const deleteData = async () => {
        const result = await deletePrestation(isEditPrestation.id);
        if (result.ok) {
            const timestamp = new Date().getTime();
            router.push(`?updated=${timestamp}`);
            // redirect(`/devis/${id}`);
        } else {
            console.error(result.message);
        }
    }

    const openWarningModal = () => setIsWarningOpen(true);
    const closeWarningModal = () => setIsWarningOpen(false);

    return (
        <div className={"flex gap-4"}>
            {isEditPrestation
                ? <EditPrestationModalTrigger openModal={openModal} prestationData={isEditPrestation} openWarningModal={openWarningModal} />
                : <NewPrestationModalTrigger openModal={openModal} />
            }

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <PrestationForm
                        onSubmit={closeModal}
                        prestationData={selectedPrestation}
                        isEditMode={isEditPrestation}
                        devisId={id}
                    />
                </Modal>
            )}

            {isWarningOpen && (
                <Modal onClose={closeWarningModal}>
                    <WarningModal
                        onClose={closeWarningModal}
                        onConfirm={() => {
                            closeWarningModal();
                            deleteData();
                        }}
                        type="prestation"
                    />
                </Modal>
            )}
        </div>
    );
}

export function NewPrestationModalTrigger({ openModal }: { openModal: (prestation) => void }) {
    return (
        <div className={"flex gap-4"}>
            <Button onClick={() => openModal(null)}>Ajouter une prestation</Button>
        </div>
    );
}

export function EditPrestationModalTrigger({ openModal, openWarningModal, prestationData }: { openModal: (prestation) => void, openWarningModal: () => void }) {
    return (
        <div className={"flex flex-wrap gap-6"}>
            <PenLine onClick={() => openModal(prestationData)} className={"cursor-pointer"}/>
            <Trash2 onClick={openWarningModal} color="#b81414" className={"cursor-pointer"}/>
        </div>
    );
}

