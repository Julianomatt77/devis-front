'use server';

import {getUserInfo, signIn} from "@/lib/auth/auth";
import {json} from "stream/consumers";

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
            const data = await response.json();

            return {ok: true, message: "Compte créé avec succès !"};
        }

        return {ok: false, message: "Une erreur est survenue lors de l'enregistrement."};

    } catch (error) {
        return {ok: false, message: `Erreur lors de l'authentification: ${error.error}`};
    }
}
