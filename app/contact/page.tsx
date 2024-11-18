'use client';

import {ChangeEvent, FormEventHandler, useState} from "react";
import {Button} from "@/components/ui/button";
import {sendMail} from "@/lib/actions";

export default function Page() {
    return (
        <main className="w-full p-4 shadow sm:p-8 ">
            <section className={"flex justify-center items-center mb-8"}>
                <h1 className="text-4xl font-bold capitalize">Contact</h1>
            </section>
            <section>
                <ContactForm/>
            </section>
        </main>
    )
}

function ContactForm() {
    const initialFormData = {
        from: '',
        subject: '',
        message: ''
    };
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialFormData);

    // Gestion des changements dans les inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = await sendMail(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                setFormData(initialFormData);
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e);
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <div className="w-full">
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Votre adresse email: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="email"
                        name="from"
                        required
                        value={formData.from}
                        onChange={handleChange}
                        placeholder="Votre adresse email..."
                        className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                    />
                </div>

                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Sujet: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="string"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Votre sujet..."
                        className="input input-bordered w-full bg-gray-50 dark:bg-gray-700"
                    />
                </div>

                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Message: <span className={"text-red-700"}>*</span></label>
                    <textarea
                        name="message"
                        value={formData.message || ''}
                        rows={15}
                        cols={50}
                        onChange={handleChange}
                        placeholder="Votre message..."
                        className="resize-y input h-2/4 block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                    ></textarea>
                </div>

            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit">Envoyer</Button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    )
}

