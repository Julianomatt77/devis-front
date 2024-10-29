'use client';

import {AtSign, KeyRound, SquareChevronRight, UserRoundPen} from "lucide-react";
import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {register} from "@/lib/actions";

export default function RegisterForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        // const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        try {
            const result = await register(undefined, formData);
            if (result.ok) {
                setSuccessMessage(result.message);

                // Redirection
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
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
                        htmlFor={"email"}>
                        Adresse email
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="generator@gmail.com"
                            required
                        />
                        <AtSign className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 peer-focus:text-gray-900" size={18} />
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
            <RegisterButton />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    );
}

function RegisterButton() {
    const { pending } = useFormStatus();
    return (
        <Button type={"submit"} className="mt-8 w-full" aria-disabled={pending}>
            S&#39;enregistrer <SquareChevronRight size={32} />
        </Button>
    );
}