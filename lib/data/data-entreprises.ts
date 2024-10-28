'use server';

import {cookies} from "next/headers";
import {create, deleteItem, recuperer, update} from "@/lib/actions";

export async function getEntreprises() {
    const url = process.env.API_URL + 'entreprises';
    const cookieStore = await cookies()
    const token = cookieStore.get('devis_token').value;

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}

export async function addEntreprise(formData: FormData){
    try {
        const url = process.env.API_URL + 'entreprises';
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            nom: formData.nom,
            siret: formData.siret,
            codeApe: formData.codeApe || undefined,
            tvaIntracom: formData.tvaIntracom || undefined,
            email: formData.email || undefined,
            telephone1: formData.telephone1 || undefined,
            telephone2: formData.telephone2 || undefined,
            web: formData.web || undefined,
            contact: formData.contact || undefined,
            adresse: formData.adresse ? { id: formData.adresse } : undefined,
        })

        const response = await create(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response};
        }

        return {ok: true, message: "Entreprise créé avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la création de l'entreprise: ${error}`};
    }
}

export async function editEntreprise(formData: FormData){
    try {
        const url = process.env.API_URL + 'entreprises/' + formData.id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            nom: formData.nom,
            siret: formData.siret,
            codeApe: formData.codeApe || undefined,
            tvaIntracom: formData.tvaIntracom || undefined,
            email: formData.email || undefined,
            telephone1: formData.telephone1 || undefined,
            telephone2: formData.telephone2 || undefined,
            web: formData.web || undefined,
            contact: formData.contact || undefined,
            adresse: formData.adresse ? { id: formData.adresse } : undefined,
        })

        const response = await update(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Entreprise mise à jour avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la modification de l'entreprise: ${error}`};
    }
}

export async function deleteEntreprise(id: number) {
    try {
        const url = process.env.API_URL + 'entreprises/' + id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const response = await deleteItem(url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Entreprise supprimée avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la suppression de l'entreprise: ${error}`};
    }
}