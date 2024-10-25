'use client';
import {addClient, editClient} from "@/lib/data";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

export default function ClientForm({ onSubmit, clientData, isEditMode }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
    });

    useEffect(() => {
        if (clientData) {
            setFormData({
                ...clientData,
                adresse: clientData.adresse?.id || '', // Utilisez l'ID de l'adresse si elle existe
            });
        }
    }, [clientData]);

    //TODO: gerer l'adresse

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        // Appelez l'API pour ajouter un client
        try {
            const result = isEditMode
                ? await editClient(formData)
                : await addClient(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                // console.log(result.data)

                // Fermez la modal après la soumission
                onSubmit();
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
                <label className="mb-3 mt-5 block text-xs font-medium">Nom: <span className={"text-red-700"}>*</span></label>
                <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Prénom:</label>
                <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Téléphone:</label>
                <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Adresse:</label>
                <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Ajouter</Button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    );
}