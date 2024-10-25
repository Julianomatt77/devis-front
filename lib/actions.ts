'use server';

import {getUserInfo, signIn} from "@/lib/auth/auth";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const response = await signIn(formData);

        if (response.status !== 200) {
            return { ok: false, message: "Identifiants incorrects." };
        }

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            const userInfo = await getUserInfo(token);

            return { ok: true, token, userInfo };
        }

        return { ok: false, message: "Une erreur est survenue lors de l'authentification." };

    } catch (error) {
        return { ok: false, message: `Erreur lors de l'authentification: ${error.error}` };
    }
}

export async function register(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const url = process.env.API_URL + 'register';

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password'),
            }),
        });

        if (response.status !== 201) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.message};
        }

        if (response.ok) {
            return {ok: true, message: "Compte créé avec succès !"};
        }

        return {ok: false, message: "Une erreur est survenue lors de l'enregistrement."};

    } catch (error) {
        return {ok: false, message: `Erreur lors de l'authentification: ${error.error}`};
    }
}

export async function create(body: any, url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body,
        });

        if (response.status !== 201) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.message};
        }

        const data = await response.json();
        return {ok: true, data: data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la requête: ${error.error}`};
    }
}

export async function update(body: any, url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: body,
        });

        if (response.status !== 200) {
            const res = await response.text();
            // const parsedRes = JSON.parse(res);
            // return {ok: false, message: parsedRes.message};
            return {ok: false, message: res};
        }

        const data = await response.json();
        return {ok: true, data: data};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la requête: ${error}`};
    }
}

export async function deleteItem(url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 202) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.error};
            // return {ok: false, message: 'pas bon'};
        }

        return {ok: true, message: "Suppression effectuée avec succès !", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la requête: ${error.error}`};
    }
}

export async function recuperer(url: string, token: string) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status !== 200) {
            const res = await response.text();
            const parsedRes = JSON.parse(res);
            return {ok: false, message: parsedRes.error};
        }

        if (response.ok) {
            const data = await response.json();
            return {ok: true, message: "Récupération effectuée avec succès !", status: response.status, data: data};
        }

        return {ok: true, message: "Erreur lors de la récupération", status: response.status};
    } catch (error) {
        return {ok: false, message: `Erreur lors de la requête GET: ${error.error}`};
    }
}