//Retourne un token
export async function signIn(formData: FormData) {
    const url = process.env.API_URL + 'login_check';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password'),
        }),
    });
}

export async function getUserInfo(token: string) {
    const url = process.env.API_URL + 'users-infos';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des informations utilisateur.');
    }

    return await response.json();  // Retourner les infos utilisateur
}