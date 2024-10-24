'use client';
import { useState} from "react";

import {KeyRound, SquareChevronRight, UserRoundPen} from "lucide-react";
import {Button} from "@/components/ui/button";
import {authenticate} from "@/lib/actions";
import {useRouter} from "next/navigation";
import {useAuth} from "@/lib/auth/AuthContext";
import { useFormStatus } from "react-dom";

export default function LoginForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        try {
            const result = await authenticate(undefined, formData);
            if (result.ok) {
                login(result.userInfo, result.token);
                setSuccessMessage("Connexion réussie ! Vous allez être rediriger vers votre dashboard.");

                // Redirection
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            } else {
                setErrorMessage(result.message || "Erreur !.");
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }

        if (form) {
            form.reset();  // Réinitialiser le formulaire
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <div>
                    <label
                        className="mb-3 mt-5 block text-xs font-medium">
                        Nom d&#39;utilisateur
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Veuillez entrer votre nom d'utilisateur"
                            required
                        />
                        <UserRoundPen className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 peer-focus:text-gray-900" size={18} />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        className="mb-3 mt-5 block text-xs font-medium"
                        htmlFor="password"
                    >
                        Mot de passe
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Votre mot de passe"
                            required
                            minLength={6}
                        />
                        <KeyRound className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 peer-focus:text-gray-900" size={18} />
                    </div>
                </div>
            </div>
            <LoginButton />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <Button type={"submit"} className="mt-8 w-full" aria-disabled={pending}>
            Se connecter <SquareChevronRight size={32} />
        </Button>
    );
}