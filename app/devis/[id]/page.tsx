import { getOneDevis} from "@/lib/data/data-devis";
import {formatDate, stringAdresse, transformPriceToEuro} from "@/lib/utils";

export default async function Page({ params }: { params: { id: number } }) {
  const id = (await params).id
  let devis = []
  let errorMessage ='';

  const result = await getOneDevis(id)
  if (result.ok) {
    devis = result.data
    const {reference, client, entreprise, prestations, deletedAt, createdAt, updatedAt, paidAt, dateDebutPrestation, dateValidite, totalHT, tva, totalTTC, tc} = devis;

    let entrepriseAdresse = '';
    if (entreprise && entreprise.adresse){
      entrepriseAdresse = stringAdresse(entreprise.adresse)
    }

    let clientAdresse = '';
    if (client && client.adresse){
      clientAdresse = stringAdresse(client.adresse)
    }

    const createdAtDate = formatDate(createdAt);
    const updatedAtDate = updatedAt ? formatDate(updatedAt): null;
    const deletedAtDate = formatDate(deletedAt);
    const paidAtDate = paidAt ? formatDate(paidAt): null;
    const debutAtDate = dateDebutPrestation ? formatDate(dateDebutPrestation): null;
    const validite = formatDate(dateValidite);

    const prixHtCalcule = transformPriceToEuro(totalHT);
    const tvaCalcule = transformPriceToEuro(tva);
    const totalTTCCalcule = transformPriceToEuro(totalTTC);

    const paid = paidAt ? "checked" : ""

  } else {
    errorMessage = result.message
  }

  const refreshData = async () => {
    const result = await getOneDevis(id);
    if (result.ok) {
      devis = result.data;
    } else {
      errorMessage = result.message
    }
  };

  return (
      <main className="flex items-center justify-center p-4">
        <div className="relative flex w-full flex-col items-center space-y-2.5 p-4">
          <div className={"mb-8"}>
            <h1 className={"text-4xl font-bold capitalize"}>{devis.reference}</h1>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </main>

  )
}