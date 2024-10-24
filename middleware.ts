import { NextResponse } from 'next/server';

export function middleware(req) {
    const token = req.cookies.get('devis_token') || null;

    // Liste des pages protégées
    const protectedPages = ['/devis', '/clients', '/entreprises', '/adresses', '/elements', '/prestations', '/dashboard'];

    // Si l'utilisateur essaie d'accéder à une page protégée sans token, redirection vers la page de login
    if (protectedPages.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

// Spécifie quelles routes doivent utiliser ce middleware
export const config = {
    matcher: ['/devis', '/clients', '/entreprises', '/adresses', '/elements', '/prestations', '/dashboard'], // routes protégées
};
