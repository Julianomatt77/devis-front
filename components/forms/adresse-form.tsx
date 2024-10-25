'use client';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {addAdresse, editAdresse} from "@/lib/data/data-adresses";

export default function AdresseForm({ onSubmit, data, isEditMode, refreshData }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        numero: '',
        rue: '',
        complementaire: '',
        cp: '',
        ville: '',
        pays: '',
    });

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const result = isEditMode
                ? await editAdresse(formData)
                : await addAdresse(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                refreshData();
                onSubmit();
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e);
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="mt-5">
                <h2 className="text-lg font-bold">{isEditMode ? 'Modifier' : 'Ajouter'} une adresse</h2>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Numéro:</label>
                    <input
                        type="number"
                        name="numero"
                        value={formData.numero || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Rue:</label>
                    <input
                        type="text"
                        name="rue"
                        value={formData.rue || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Complémentaire:</label>
                    <input
                        type="text"
                        name="complementaire"
                        value={formData.complementaire || ''}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Code postal: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="text"
                        name="cp"
                        value={formData.cp}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Ville: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="text"
                        name="ville"
                        value={formData.ville}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Pays: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="text"
                        name="pays"
                        value={formData.pays}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button type="submit">{isEditMode ? 'Modifier' : 'Ajouter'}</Button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    );
}
