'use client';

import {useEffect, useState} from "react";
import {getDevis} from "@/lib/data/data-devis";
import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/cards";
import Modal from "@/components/ui/modal";
import DevisForm from "@/components/forms/devis-form";
import {redirect, useRouter, useSearchParams} from "next/navigation";
import {CircleX} from "lucide-react";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDevis, setSelectedDevis] = useState(null);
    const [data, setData] = useState([]);

    const router = useRouter();
    const searchParams = useSearchParams()
    const search = searchParams.get('search')?.toLowerCase()

    useEffect(() => {
        async function fetchData() {
            const result = await getDevis();
            if (result.ok) {
                const fetchedDevis = result.data;
                // On filtre les devis supprimés
                const activeDevis = fetchedDevis.filter((devis) => !devis.deletedAt)
                //Fonction de recherche
                const filteredDevis = search ? searchFilter(activeDevis, search) : activeDevis

                setData(filteredDevis);
            }
        }
        fetchData();
    }, [search]);

    const refreshData = async () => {
        const result = await getDevis();
        if (result.ok) {
            const updatedDevis = result.data;
            const activeDevis = updatedDevis.filter((devis) => !devis.deletedAt)

            const filteredDevis = search ? searchFilter(activeDevis, search) : activeDevis

            setData(filteredDevis);
        }
    };

    const openEditModal = (devis) => {
        if (devis && devis.id) {
        setSelectedDevis(devis);
        redirect(`/devis/${devis.id}`);
        } else {
            setIsModalOpen(true);
        }
    };

    const closeModal = (devis) => {
        if (devis.id) {
            setSelectedDevis(devis);
        }
        setIsModalOpen(false);
        setSelectedDevis(null);
    };

    return (
        <main className="w-full p-4 shadow sm:p-8">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Devis</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouveau devis</Button>
                </div>
            </div>

            {/* Barre de recherche */}
            <div className="mb-4 relative">
                <input
                    type="text"
                    placeholder="Rechercher par référence de devis, nom ou prénom du client"
                    className="p-2 border border-gray-300 rounded w-full"
                    value={search || ''}
                    onChange={(e) => {
                        router.push('?search=' + e.target.value.toLowerCase());
                    }}
                />
                {search && (
                    <CircleX
                        className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600"
                        onClick={() => {
                            // Réinitialiser le champ de recherche
                            router.push('?');
                        }}
                    />
                )}
            </div>

            {data.length === 0 && (<div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                <p>Aucun devis à afficher</p>
            </div>)}

            <CardWrapper
                data={data}
                onEditData={openEditModal}
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

function searchFilter(devisList, search){
    return devisList.filter((devis) => {
        const referenceMatch = devis.reference.toLowerCase().includes(search);
        const nomMatch = devis.client.nom.toLowerCase().includes(search);
        const prenomMatch = devis.client.prenom.toLowerCase().includes(search);
        return referenceMatch || nomMatch || prenomMatch;
    });
}