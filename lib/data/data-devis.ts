'use server';

import {cookies} from "next/headers";
import {create, deleteItem, recuperer, update} from "@/lib/actions";

export async function getDevis() {
    const url = process.env.API_URL + 'devis';
    const cookieStore = await cookies()
    const token = cookieStore.get('devis_token').value;

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}

export async function addDevis(formData: FormData){
    try {
        const url = process.env.API_URL + 'devis';
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            reference: formData.reference,
            entreprise: { id: formData.entreprise },
            client: { id: formData.client },
            paidAt: formData.paidAt || undefined,
            dateDebutPrestation: formData.dateDebutPrestation || undefined,
            tc: formData.tc || undefined
        })

        const response = await create(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response};
        }

        return {ok: true, message: "Devis crée avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la création du devis: ${error}`};
    }
}

export async function editDevis(formData: FormData){
    try {
        const url = process.env.API_URL + 'devis/' + formData.id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            reference: formData.reference,
            entreprise: { id: formData.entreprise },
            client: { id: formData.client },
            paidAt: formData.paidAt || undefined,
            dateDebutPrestation: formData.dateDebutPrestation || undefined,
            tc: formData.tc || undefined
        })

        const response = await update(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Devis mis à jour avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la modification du devis: ${error}`};
    }
}

export async function deleteDevis(id: number) {
    try {
        const url = process.env.API_URL + 'devis/' + id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const response = await deleteItem(url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Devis supprimé avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la suppression du devis: ${error}`};
    }
}

export async function getOneDevis(id: number) {
    const url = process.env.API_URL + 'devis/' + id;
    const cookieStore = await cookies()
    const token = cookieStore.get('devis_token').value;

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}