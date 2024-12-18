'use client';

import {useEffect, useState} from "react";
import {getDevis} from "@/lib/data/data-devis";
import {Button} from "@/components/ui/button";
import CardWrapper from "@/components/cards";
import Modal from "@/components/ui/modal";
import DevisForm from "@/components/forms/devis-form";
import {redirect} from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { Suspense } from 'react';

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDevis, setSelectedDevis] = useState(null);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        async function fetchData() {
            const result = await getDevis();
            if (result.ok) {
                const fetchedDevis = result.data;
                // On filtre les devis supprimés
                const activeDevis = fetchedDevis.filter((devis) => !devis.deletedAt)
                //Fonction de recherche
                const filteredDevis = search || clientId ? searchFilter(activeDevis, search, clientId) : activeDevis

                setData(filteredDevis);
            }
        }
        fetchData();
    }, [search, clientId]);

    const refreshData = async () => {
        const result = await getDevis();
        if (result.ok) {
            const updatedDevis = result.data;
            const activeDevis = updatedDevis.filter((devis) => !devis.deletedAt)

            const filteredDevis = search || clientId ? searchFilter(activeDevis, search, clientId) : activeDevis

            setData(filteredDevis);
        }
    };

    const refreshSearch = (e) =>{
        setSearch(e);
        refreshData();
    }

    const refreshClient = (clientId) =>{
        setClientId(clientId);
        refreshData();
    }

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
        <Suspense fallback={<div>Chargement...</div>}>
        <main className="w-full p-4 shadow sm:p-8">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Devis</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouveau devis</Button>
                </div>
            </div>

             <SearchBar
                 search={search}
                 placeholder={"Rechercher par référence de devis ou par nom, prénom, ou email du client"}
                 clientId={clientId}
                 refreshSearch={refreshSearch}
                 refreshClient={refreshClient}
             />

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
        </Suspense>

    )
}

function searchFilter(devisList, search, clientId){
    if (clientId) {
        return devisList.filter((devis) => {
            return devis.client.id == clientId;
        });
    }

    return devisList.filter((devis) => {
        const referenceMatch = devis.reference.toLowerCase().includes(search);
        const nomMatch = devis.client.nom.toLowerCase().includes(search);
        const prenomMatch = devis.client.prenom.toLowerCase().includes(search);
        const emailMatch = devis.client.email.toLowerCase().includes(search);
        return referenceMatch || nomMatch || prenomMatch || emailMatch;
    });
}

// function Search() {
//     const searchParams = useSearchParams()
//     const router = useRouter();
//
//     return (
//             <div className="mb-4 relative">
//                 <input
//                     type="text"
//                     placeholder={placeholder}
//                     className="p-2 border border-gray-300 rounded w-full"
//                     value={search || ''}
//                     onChange={(e) => {
//                         router.push('?search=' + e.target.value.toLowerCase());
//                     }}
//                 />
//                 {search && (
//                     <CircleX
//                         className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600"
//                         onClick={() => {
//                             router.push('?');
//                         }}
//                     />
//                 )}
//             </div>
//     );
// }