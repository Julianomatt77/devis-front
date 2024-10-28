'use server';

import {cookies} from "next/headers";
import {create, deleteItem, recuperer, update} from "@/lib/actions";

export async function getProducts() {
    const url = process.env.API_URL + 'elements';
    const cookieStore = await cookies()
    const token = cookieStore.get('devis_token').value;

    const response = await recuperer(url, token);

    if (!response.ok) {
        return {ok: false, message: response.message}
    }

    return {ok: true, message: response.message, data: response.data};
}

export async function addProduct(formData: FormData){
    try {
        const url = process.env.API_URL + 'elements';
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            nom: formData.nom
        })

        const response = await create(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response};
        }

        return {ok: true, message: "Produit ajouté avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de l'ajout du produit': ${error}`};
    }
}

export async function editProduct(formData: FormData){
    try {
        const url = process.env.API_URL + 'elements/' + formData.id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const body = JSON.stringify({
            nom: formData.nom
        })

        const response = await update(body, url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Produit mise à jour avec succès !", data: response.data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la modification du produit: ${error}`};
    }
}

export async function deleteProduct(id: number) {
    try {
        const url = process.env.API_URL + 'elements/' + id;
        const cookieStore = await cookies()
        const token = cookieStore.get('devis_token').value;

        const response = await deleteItem(url, token);

        if (!response.ok) {
            return {ok: false, message: response.message};
        }

        return {ok: true, message: "Produit supprimé avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la suppression du produit: ${error}`};
    }
}