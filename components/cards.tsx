'use client';
import {Button} from "@/components/ui/button";
import {deleteClients} from "@/lib/data/data-clients";
import {useState} from "react";
import {deleteAdresses} from "@/lib/data/data-adresses";
import {deleteProduct} from "@/lib/data/data-products";
import {deleteEntreprise} from "@/lib/data/data-entreprises";
import {deleteDevis} from "@/lib/data/data-devis";
import {formatDate, stringAdresse, transformPriceToEuro} from "@/lib/utils";
import {CircleCheckBig, CircleDashed} from "lucide-react";
import Modal from "@/components/ui/modal";
import WarningModal from "@/components/WarningModal";
import {redirect} from "next/navigation";

export default function CardWrapper({ data, onEditData, type, isDashboard, refreshData }) {

    if (isDashboard) {
        if (type === "dashboardClient") {
            return (
                <div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                    {/*<div className="flow-root">*/}
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data.map((item: any) => {
                                return <DashboardCardClient data={item} key={item.id} />
                            })}
                        </ul>
                    {/*</div>*/}
                </div>
            )
        }

        if (type === "dashboardDevis") {
            return (
                <div id={"card-dashboardDevis-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 w-full">
                        {data.map((item: any) => {
                            return <DashboardCardDevis data={item} key={item.id} />
                        })}
                    </ul>
                </div>
            )
        }
    }

    if (type === "devis") {
        return (
            <div id={"card-devis-wrapper"} className={"flex flex-wrap justify-center gap-5 w-full"}>
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-200 w-full">
                        {data.map((item: any) => {
                            return <CardDevis
                                data={item}
                                key={item.id}
                                onEditData={onEditData}
                                refreshData={refreshData}
                            />
                        })}
                    </ul>
            </div>
        )
    }

    return (
        <div id={"card-wrapper"} className={"flex flex-wrap justify-center gap-5"}>
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
                    />
                }

                if (type === "product") {
                    return <CardProduct
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                    />
                }

                if (type === "entreprise") {
                    return <CardEntreprise
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                    />
                }

                if (type === "prestation") {
                    return <CardPrestation
                        data={item}
                        key={item.id}
                        onEditData={onEditData}
                        refreshData={refreshData}
                    />
                }
            })}

        </div>
    )
}

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
                    <Button onClick={() => {redirect(`/devis?client=${data.id}`)}} variant={"secondary"}>Devis</Button>
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
            </div>
        </li>
    )
}

export function DashboardCardDevis(props: {data: any}) {
    const {data} = props;
    const {client, totalTTC, reference, paidAt, createdAt, updatedAt} = data;

    const devisDate = updatedAt ? formatDate(updatedAt): formatDate(createdAt);
    const paid = paidAt ? "checked" : ""
    const totalTTCCalcule = transformPriceToEuro(totalTTC);

    return (
        <li className="py-3 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-0 min-w-0 ms-4 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {reference}
                    </p>
                </div>
                <div className="flex sm:flex-col flex-1 min-w-0 gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {client.nom} {client.prenom}
                    </p>
                </div>
                <div className="flex sm:flex-col flex-2 min-w-0 gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {devisDate}
                    </p>
                </div>
                <div className="flex flex-3 min-w-0 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {totalTTCCalcule}
                    </p>
                </div>
                <div className="flex flex-4 min-w-0 ms-4 gap-4">
                    <div className="form-control">
                        <label className="label">
                            {!paid && <CircleDashed className=""/>}
                            {paid && <CircleCheckBig className="text-green-500"/>}
                        </label>
                    </div>
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

export function CardProduct({ data, onEditData, refreshData }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const deleteData = async (id) => {
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        try {
            const result = await deleteProduct(id);

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
                <h2 className="card-title">{data.nom}</h2>

                <div className="card-actions justify-end">
                    <Button onClick={() => onEditData(data)}>Modifier</Button>
                    <Button onClick={() => deleteData(data.id)} variant="destructive">Supprimer</Button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
        </div>
    )
}

export function CardEntreprise({ data, onEditData, refreshData }) {
    const {adresse, codeApe, contact, devis, email, id, nom, siret, telephone1, telephone2, tvaIntracom, web} = data;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    let displayAdresse = '';

    if (adresse){
        displayAdresse = stringAdresse(adresse)
    }

    const deleteData = async (id) => {
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        try {
            const result = await deleteEntreprise(id);

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
        <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{nom}</h2>
                <p>siret: {siret}</p>
                {tvaIntracom && <p>Numéro de TVA intracommunautaire: {tvaIntracom}</p>}
                {codeApe && <p>Code APE: {codeApe}</p>}
                { contact && <p>{contact}</p>}
                { web && <a href={web} target={"blank"}>{web}</a>}
                <p>{displayAdresse || null}</p>
                {telephone1 && <p className="card-subtitle">{telephone1}</p>}
                {telephone2 && <p className="card-subtitle">{telephone2}</p>}
                {email && <p className="card-subtitle">{email}</p>}
                <div className="card-actions justify-end">
                    <Button onClick={() => onEditData(data)}>Modifier</Button>
                    <Button onClick={() => deleteData(data.id)} variant="destructive">Supprimer</Button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
        </div>
    )
}

export function CardDevis({ data, onEditData, refreshData }) {
    const {reference, client, createdAt, updatedAt, paidAt, totalTTC} = data;
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isWarningOpen, setIsWarningOpen] = useState(false);

    const openWarningModal = () => setIsWarningOpen(true);
    const closeWarningModal = () => setIsWarningOpen(false);

    const createdAtDate = formatDate(createdAt);
    const updatedAtDate = updatedAt ? formatDate(updatedAt): null;
    const totalTTCCalcule = transformPriceToEuro(totalTTC);

    const paid = paidAt ? "checked" : ""

    const deleteData = async (id) => {
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        try {
            const result = await deleteDevis(id);

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
        <li className="py-3 sm:py-4 w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 lg:mb-0">
                <div className="flex min-w-0 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span className={"dark:text-gray-400"}>Référence: </span>{reference}
                    </p>
                </div>
                <div className="flex min-w-0 gap-4">
                    <p className="text-sm text-gray-900 dark:text-white">
                        <span className={"dark:text-gray-400"}>Client: </span>{client.nom} {client.prenom}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {totalTTCCalcule}
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span className={"dark:text-gray-400"}>Créé le: </span>{createdAtDate}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {updatedAt && <span><span className={"dark:text-gray-400"}>Mis à jour le: </span>{updatedAtDate}</span>}
                    </p>
                </div>
                <div className="flex flex-wrap items-center text-base font-semibold text-gray-900 dark:text-white">
                    <div className="justify-center">
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                {!paid && <CircleDashed className=""/>}
                                {paid && <CircleCheckBig className="text-green-500"/>}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex flex-wrap items-center justify-center gap-16"}>
                <Button onClick={() => onEditData(data)}>Modifier / Voir</Button>
                <Button onClick={openWarningModal} variant="destructive">Supprimer</Button>
                {isWarningOpen && (
                    <Modal onClose={closeWarningModal}>
                        <WarningModal
                            onClose={closeWarningModal}
                            onConfirm={() => {
                                closeWarningModal();
                                deleteData(data.id);
                            }}
                            type="devis"
                        />
                    </Modal>
                )}
                {successMessage && <p className="text-green-500">{successMessage}</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </li>
    )
}

export function CardPrestation({ data, onEditData, refreshData }) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
            </div>
        </div>
    )
}