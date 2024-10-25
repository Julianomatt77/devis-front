'use client';
import {Button} from "@/components/ui/button";
import {deleteClients} from "@/lib/data/data-clients";
import {useState} from "react";
import {deleteAdresses} from "@/lib/data/data-adresses";

// export default function CardWrapper({ data, onEditClient, type, isDashboard, onDeleteClient }) {
export default function CardWrapper({ data, onEditData, type, isDashboard, refreshData }) {

    if (isDashboard) {
        if (type === "dashboardClient") {
            return (
                <div className={"flex flex-wrap justify-center gap-5"}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data.map((item: any) => {
                                return <DashboardCardClient data={item} key={item.id} />
                            })}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={"flex flex-wrap justify-center gap-5"}>
            {data.map((item: any) => {
                if (type === "client") {
                    return <CardClient
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                        // onDeleteClient={onDeleteClient}
                    />
                }

                if (type === "adresse") {
                    return <CardAdresse
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                        // onDeleteClient={onDeleteClient}
                    />
                }
            })}

        </div>
    )
}

function stringAdresse(adresse){
    const {complementaire, cp, numero,  pays, rue, ville} = adresse;
    const adresseParts = [];

    if (numero) adresseParts.push(numero + ',');
    if (rue) adresseParts.push(rue + ',');
    if (complementaire) adresseParts.push(complementaire + ',');
    if (cp) adresseParts.push(cp + ',');
    if (ville) adresseParts.push(ville + ',');
    if (pays) adresseParts.push(pays);

    return adresseParts.join(' ');
}

// export function CardClient({ data, onEditClient, onDeleteClient }) {
export function CardClient({ data, onEditData, refreshData }) {
    const {adresse, devis, email, id, nom, prenom, telephone} = data;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    let displayAdresse = '';

    if (adresse){
        displayAdresse = stringAdresse(adresse)
    }

    const deleteClient = async (clientId) => {
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        try {
            const result = await deleteClients(clientId);

            if (result.ok) {
                setSuccessMessage(result.message);
                refreshData()
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{nom} {prenom}</h2>
                <p>{displayAdresse || null}</p>
                <p className="card-subtitle">{telephone}</p>
                <p className="card-subtitle">{email}</p>
                <div className="card-actions justify-end">
                    {/*<Button>Voir</Button>*/}
                    <Button onClick={() => onEditData(data)}>Modifier</Button>
                    <Button onClick={() => deleteClient(data.id)} variant="destructive">Supprimer</Button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
        </div>
    )
}

export function DashboardCardClient(props: {data: any}) {
    const {data} = props;
    const {devis, email, id, nom, prenom} = data;

    // console.log(devis)

    return (
        <li className="py-3 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-1 min-w-0 ms-4 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {nom} {prenom}
                    </p>
                </div>
                <div className="flex flex-2 min-w-0 ms-4 gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {email}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    xx€
                </div>
            </div>
        </li>
    )
}

export function CardAdresse({ data, onEditData, refreshData }) {
    const {numero, rue, complementaire, cp, ville, pays} = data;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const displayAdresse = stringAdresse(data)


    const deleteAdresse = async (id) => {
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        try {
            const result = await deleteAdresses(id);

            if (result.ok) {
                setSuccessMessage(result.message);
                refreshData()
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{displayAdresse}</h2>

                <div className="card-actions justify-end">
                    {/*<Button>Voir</Button>*/}
                    <Button onClick={() => onEditData(data)}>Modifier</Button>
                    <Button onClick={() => deleteAdresse(data.id)} variant="destructive">Supprimer</Button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
        </div>
    )
}