'use client';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {addProduct, editProduct} from "@/lib/data/data-products";

export default function ProductForm({ onSubmit, data, isEditMode, refreshData }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nom: ''
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
                ? await editProduct(formData)
                : await addProduct(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                refreshData();
                onSubmit(result.data.id);
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
                <h2 className="text-lg font-bold">{isEditMode ? 'Modifier' : 'Ajouter'} un produit</h2>
                <div>
                    <label className="mb-3 mt-5 block text-xs font-medium">Nom du produit: <span className={"text-red-700"}>*</span></label>
                    <input
                        type="string"
                        name="nom"
                        required
                        value={formData.nom}
                        onChange={handleChange}
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
