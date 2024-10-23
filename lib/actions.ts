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
