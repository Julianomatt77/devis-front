'use server';

import {cookies} from "next/headers";
import {create, deleteItem, recuperer, update} from "@/lib/actions";

export async function getPrestations() {
    const url = process.env.API_URL + 'prestations';
    const cookieStore = await cookies()
    const token = cookieStore.get('devis_token').value;

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}

export async function addPrestation(formData: FormData){
    try {
        const url = process.env.API_URL + 'prestations';
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            qty: formData.qty,
            element: { id: formData.element },
            devis: { id: formData.devis },
            prixHT: formData.prixHT * 100,
            tvaPercentage: formData.tvaPercentage
        })

        const response = await create(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Prestation créee avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la création de la prestation: ${error}`};
    }
}

export async function editPrestation(formData: FormData){
    try {
        const url = process.env.API_URL + 'prestations/' + formData.id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            qty: formData.qty,
            element: { id: formData.element },
            devis: { id: formData.devis },
            prixHT: formData.prixHT * 100,
            tvaPercentage: formData.tvaPercentage
        })

        const response = await update(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Prestation mise à jour avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la modification de la prestation: ${error}`};
    }
}

export async function deletePrestation(id: number) {
    try {
        const url = process.env.API_URL + 'prestations/' + id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const response = await deleteItem(url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Prestation supprimée avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la suppression de la prestation: ${error}`};
    }
}