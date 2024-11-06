'use client';
import {useEffect, useState} from "react";
import CardWrapper from "@/components/cards";
import {Button} from "@/components/ui/button";
import ClientForm from "@/components/forms/client-form";
import Modal from "@/components/ui/modal";
import {getClients} from "@/lib/data/data-clients";
import SearchBar from "@/components/SearchBar";
import {useSearchParams} from "next/navigation";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [data, setData] = useState([]);

    const searchParams = useSearchParams()
    const search = searchParams.get('search')?.toLowerCase()
    const clientId = searchParams.get('client')

    useEffect(() => {
        async function fetchData() {
            const result = await getClients();
            if (result.ok) {
                const fetchedClients = result.data;
                const filteredClients = search || clientId ? searchFilter(fetchedClients, search, clientId) : fetchedClients
                setData(filteredClients);
            }
        }
        fetchData();
    }, [search]);

    const refreshData = async () => {
        const result = await getClients();
        if (result.ok) {
            const updatedClients = result.data;
            const filteredClients = search || clientId ? searchFilter(updatedClients, search, clientId) : updatedClients
            setData(filteredClients);
        }
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
        <main className="w-full p-4 shadow sm:p-8">
            <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
                <div className={"mb-8"}>
                    <h1 className={"text-4xl font-bold capitalize"}>Clients</h1>
                </div>
                <div>
                    <Button onClick={() => openEditModal(null)}>Nouveau client</Button>
                </div>
            </div>

            <SearchBar search={search} placeholder={"Rechercher par nom, prénom ou email"} />

            {data.length === 0 && (<div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                <p>Aucun client à afficher</p>
            </div>)}

            <CardWrapper
                data={data}
                onEditData={openEditModal}
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
            {/*</div>*/}
        </main>
    );
}

function searchFilter(clientsList, search, clientId){
    if (clientId) {
        return clientsList.filter((client) => {
            return client.id == clientId;
        });
    }

    return clientsList.filter((client) => {
        const nomMatch = client.nom.toLowerCase().includes(search);
        const prenomMatch = client.prenom?.toLowerCase().includes(search);
        const emailMatch = client.email?.toLowerCase().includes(search);
        return  nomMatch || prenomMatch || emailMatch;
    });
}
