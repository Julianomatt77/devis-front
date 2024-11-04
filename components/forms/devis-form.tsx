'use client';
import {getClients} from "@/lib/data/data-clients";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {addDevis, editDevis} from "@/lib/data/data-devis";
import {getEntreprises} from "@/lib/data/data-entreprises";
import ClientForm from "@/components/forms/client-form";
import {transformDateTimeToDate} from "@/lib/utils";

export default function DevisForm({ onSubmit, devisData, isEditMode, refreshData }) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [entreprisesList, setEntreprisesList] = useState([]);
    const [clientsList, setClientsList] = useState([]);
    const [showClientForm, setShowClientForm] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        reference: '',
        paidAt: '',
        dateDebutPrestation: '',
        tc: '',
        entreprise: '',
        client: '',
    });

    const fetchEntreprises = async () => {
        const entreprises = await getEntreprises();
        setEntreprisesList(entreprises.data);
    };

    useEffect(() => {
        fetchEntreprises(); // Charger la liste au montage du composant
    }, []);

    const fetchClients = async () => {
        const clients = await getClients();
        setClientsList(clients.data);
    };

    useEffect(() => {
        fetchClients(); // Charger la liste au montage du composant
    }, []);

    useEffect(() => {
        if (devisData) {
            setFormData({
                ...devisData,
                entreprise: devisData.entreprise?.id || '',
                client: devisData.client?.id || '',
                dateValidite: devisData.dateValidite ? transformDateTimeToDate(devisData.dateValidite) : '',
            });

            if (devisData.dateDebutPrestation) {
                setFormData((prevData) => ({
                    ...prevData,
                    dateDebutPrestation: transformDateTimeToDate(devisData.dateDebutPrestation),
                }));
            }
        }
    }, [devisData]);

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEntrepriseChange = (e) => {
        const selectedValue = e.target.value;
        setFormData((prevData) => ({ ...prevData, entreprise: selectedValue }));
    };

    const handleClientChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === 'other') {
            setShowClientForm(true);
            setFormData((prevData) => ({ ...prevData, client: '' }));
        } else {
            setShowClientForm(false);
            setFormData((prevData) => ({ ...prevData, client: selectedValue }));
        }
    };

    // Mise à jour des données d'adresse personnalisée après l'ajout dans AdresseForm
    const handleCustomClientSubmit = async (newClient) => {
        await fetchClients();

        // Sélectionner automatiquement la nouvelle adresse ajoutée
        setFormData((prevData) => ({
            ...prevData,
            client: newClient,
        }));

        // Masquer le formulaire d'adresse
        setShowClientForm(false);
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null); // Réinitialise les messages
        setSuccessMessage(null);

        try {
            const result = isEditMode
                ? await editDevis(formData)
                : await addDevis(formData);

            if (result.ok) {
                setSuccessMessage(result.message);
                if (!isEditMode) {
                    refreshData();//Refresh la liste des devis
                    // TODO: aller sur la page du devis pour ajouter des prestations
                    // Ou afficher une modale pour ajouter des prestations
                }
                onSubmit(result.data);
            } else {
                setErrorMessage(result.message);
            }
        } catch (e) {
            console.log(e)
            setErrorMessage("Une erreur est survenue. Veuillez réessayer. ");
        }
    };

    return (
    <div className={"flex"}>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <h2 className="text-lg font-bold">{isEditMode ? 'Modifier' : 'Ajouter'} un devis</h2>
            <div>
                <label className="mb-3 mt-5 block text-xs font-medium">Référence: <span className={"text-red-700"}>*</span></label>
                <input
                    type="text"
                    name="reference"
                    value={formData.reference || ''}
                    onChange={handleChange}
                    required
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label className="mb-3 mt-5 block text-xs font-medium">Entreprise: <span className={"text-red-700"}>*</span></label>
                <select
                    name="entreprise"
                    value={formData.entreprise || ''}
                    required
                    onChange={handleEntrepriseChange}
                    className="input input-bordered w-full"
                >
                    <option value="">Sélectionnez une entreprise</option>
                    {entreprisesList.map((entreprise) => (
                        <option key={entreprise.id} value={entreprise.id}>
                            {entreprise.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="mb-3 mt-5 block text-xs font-medium">Client: <span className={"text-red-700"}>*</span></label>
                <select
                    name="client"
                    value={formData.client || ''}
                    required
                    onChange={handleClientChange}
                    className="input input-bordered w-full"
                >
                    <option value="">Sélectionnez un client</option>
                    {clientsList.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.nom} {client.prenom}
                        </option>
                    ))}
                    <option value="other">Nouveau client</option>
                </select>
            </div>
            <div>
                <label>Payé le:</label>
                <input
                    type="date"
                    name="paidAt"
                    value={formData.paidAt || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Début de la prestation:</label>
                <input
                    type="date"
                    name="dateDebutPrestation"
                    value={formData.dateDebutPrestation || ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>
            <div>
                <label>Termes et conditions:</label>
                <textarea
                    name="tc"
                    value={formData.tc || ''}
                    rows={5}
                    cols={50}
                    onChange={handleChange}
                    className="input input-bordered w-full pt-4"
                ></textarea>
            </div>

            <div className="flex justify-end">
                <Button type="submit">{isEditMode ? 'Modifier' : 'Ajouter'}</Button>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
         {/*Affiche ClientForm en dehors du formulaire principal si "Autre" est sélectionné */}
        {showClientForm && (
            <ClientForm
                onSubmit={handleCustomClientSubmit}
                isEditMode={false}
                refreshData={refreshData}
            />
        )}
    </div>
    );
}