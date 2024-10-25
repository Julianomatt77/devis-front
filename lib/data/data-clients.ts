'use server';

import {cookies} from "next/headers";
import {create, deleteItem, recuperer, update} from "@/lib/actions";

export async function getClients() {
    const url = process.env.API_URL + 'clients';
    const cookieStore = await cookies()
    const token = cookieStore.get('devis_token').value;

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}

export async function addClient(formData: FormData){
    try {
        const url = process.env.API_URL + 'clients';
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email || undefined,
            telephone: formData.telephone || undefined,
            adresse: formData.adresse ? { id: formData.adresse } : undefined,
        })

        const response = await create(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response};
        }

        return {ok: true, message: "Client créé avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la création du client: ${error}`};
    }
}

export async function editClient(formData: FormData){
    try {
        const url = process.env.API_URL + 'clients/' + formData.id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email || undefined,
            telephone: formData.telephone || undefined,
            adresse: formData.adresse ? { id: formData.adresse } : undefined,
        })

        const response = await update(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Client mis à jour avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la modification du client: ${error}`};
    }
}

export async function deleteClients(id: number) {
    try {
        const url = process.env.API_URL + 'clients/' + id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const response = await deleteItem(url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Client supprimé avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la suppression du client: ${error}`};
    }
}