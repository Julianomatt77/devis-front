'use server';

import {cookies} from "next/headers";
import {create, deleteItem, recuperer, update} from "@/lib/actions";

export async function getAdresses() {
    const url = process.env.API_URL + 'adresses';
    const cookieStore = await cookies()
    const token = cookieStore.get('devis_token').value;

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}

export async function addAdresse(formData: FormData){
    try {
        const url = process.env.API_URL + 'adresses';
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            cp: formData.cp,
            ville: formData.ville,
            pays: formData.pays,
            numero: Number(formData.numero)  || undefined,
            rue: formData.rue || undefined,
            complementaire: formData.complementaire || undefined,
        })

        const response = await create(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response};
        }

        return {ok: true, message: "Adresse ajoutée avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la création de l'adresse: ${error}`};
    }
}

export async function editAdresse(formData: FormData){
    try {
        const url = process.env.API_URL + 'adresses/' + formData.id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            cp: formData.cp,
            ville: formData.ville,
            pays: formData.pays,
            numero: Number(formData.numero) || undefined,
            // numero: formData.numero || undefined,
            rue: formData.rue || undefined,
            complementaire: formData.complementaire || undefined,
        })

        const response = await update(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Adresse mise à jour avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la modification de l'adresse: ${error}`};
    }
}

export async function deleteAdresses(id: number) {
    try {
        const url = process.env.API_URL + 'adresses/' + id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const response = await deleteItem(url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Adresse supprimé avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la suppression de l'adresse: ${error}`};
    }
}