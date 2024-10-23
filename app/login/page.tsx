import {Metadata} from "next";
import LoginForm from "@/components/login-form";

export const metadata: Metadata = {
    title: 'Devis Generator/Login',
};

export default function loginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div>
                    <h1 className={"text-4xl font-bold capitalize"}>Se connecter</h1>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}