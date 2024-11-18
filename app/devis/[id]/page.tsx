import {getOneDevis} from "@/lib/data/data-devis";
import {formatDate, stringAdresseRue, stringAdresseVille, transformPriceToEuro} from "@/lib/utils";
import {CircleCheckBig, CircleDashed} from "lucide-react";
import ModalTrigger from "@/components/ModalTrigger";
import {Button} from "@/components/ui/button";
import PrestationModalTrigger from "@/components/PrestationModalTrigger";
import PDFExportButton from "@/components/PDFExportButton";

export default async function Page({ params }: { params: { id: number } }) {
  const id = (await params).id

  //TODO: créer un modèle
  let devis = {}
  let errorMessage ='';
  let entreprise = {};
  let client = {};
  let prestations = []
  let entrepriseAdresseRue = '';
  let entrepriseAdresseVille = '';
  let clientAdresseRue = '';
  let clientAdresseVille = '';
  let updatedAtDate = '';
  let paidAtDate = '';
  let debutAtDate = '';
  let validite = '';
  let prixHtCalcule = '';
  let tvaCalcule = '';
  let totalTTCCalcule = '';
  let tc = '';
  let paidAt = '';
  let dateDebutPrestation = '';
  let dateValidite = '';
  let totalHT = '';
  let tva = '';
  let totalTTC = '';
  let createdAt = '';
  let updatedAt = '';
  let contactClient = '';
  let paid = '';

  // await getServerSideProps()

  const result = await getOneDevis(id)
  if (result.ok) {
    devis = result.data
    // console.log(devis)
    // const {reference, deletedAt, createdAt, updatedAt, paidAt, dateDebutPrestation, dateValidite, totalHT, tva, totalTTC, tc} = devis;

    entreprise = devis.entreprise;
    client = devis.client;
    prestations = devis.prestations;

    paidAt = devis.paidAt;
    dateDebutPrestation = devis.dateDebutPrestation;
    dateValidite = devis.dateValidite;
    totalHT = devis.totalHT;
    tva = devis.tva;
    totalTTC = devis.totalTTC;
    tc = devis.tc;
    createdAt = devis.createdAt
    updatedAt = devis.updatedAt

    if (entreprise && entreprise.adresse){
      entrepriseAdresseRue = stringAdresseRue(entreprise.adresse)
      entrepriseAdresseVille = stringAdresseVille(entreprise.adresse)
    }

    if (client && client.adresse){
      clientAdresseRue = stringAdresseRue(client.adresse)
      clientAdresseVille = stringAdresseVille(client.adresse)
    }

    if (client){
      if (client.email){
        contactClient = client.email
      } else if (client.telephone){
        contactClient = client.telephone
      }
    }

    const createdAtDate = formatDate(createdAt);
    updatedAtDate = updatedAt ? formatDate(updatedAt): createdAtDate;
    paidAtDate = paidAt ? formatDate(paidAt): null;
    debutAtDate = dateDebutPrestation ? formatDate(dateDebutPrestation): "A définir";
    validite = formatDate(dateValidite);
    prixHtCalcule = transformPriceToEuro(totalHT);
    tvaCalcule = transformPriceToEuro(tva);
    totalTTCCalcule = transformPriceToEuro(totalTTC);
    paid = paidAt ? "checked" : ""

  } else {
    errorMessage = result.message
  }

  return (
      <main id={"devis-" + id} className="flex flex-col items-between justify-start p-4 w-full">
        <section id={"devis-actions-section"} className={"flex items-center justify-between gap-4 p-4"}>
          <a href={"/devis"}><Button>Retour aux devis</Button></a>
          <ModalTrigger devisData={devis} id={devis?.id} />
        </section>
        {/*{devis && prixHtCalcule && tvaCalcule && totalTTCCalcule && <PDFExportButton*/}
        {/*    devis={devis}*/}
        {/*    prixHtCalcule={prixHtCalcule}*/}
        {/*    tvaCalcule={tvaCalcule}*/}
        {/*    totalTTCCalcule={totalTTCCalcule}*/}
        {/*    entrepriseAdresseRue={entrepriseAdresseRue}*/}
        {/*    entrepriseAdresseVille={entrepriseAdresseVille}*/}
        {/*    clientAdresseRue={clientAdresseRue}*/}
        {/*    clientAdresseVille={clientAdresseVille}*/}
        {/*    id={devis?.id}*/}
        {/*/>}*/}

        <section id={"top section"} className={"flex items-start justify-between w-full mb-8 p-4"}>
          <div id={"entreprise-adresse-section"}>
            {entreprise && (
                <>
                  <p>{entreprise.nom}</p>
                  {entreprise.contact && <p>{entreprise.contact}</p>}
                  <p>{entrepriseAdresseRue}</p>
                  <p>{entrepriseAdresseVille}</p>
                </>
            )}
          </div>
          <div className={"flex gap-4"}>
            <h1 className="text-4xl font-bold capitalize">{devis.reference}</h1>
            <div className="flex flex-wrap items-center text-base font-semibold text-gray-900 dark:text-white">
              <div className="justify-center">
                <div className="form-control">
                  <label className="label">
                    {!paid && <CircleDashed className=""/>}
                    {paid && <CircleCheckBig className="text-green-500"/>}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id={"devis-details"} className={"flex flex-wrap items-start justify-between w-full mb-8 p-4 gap-4"}>
          <div id={"devis-infos"} className={"bordered rounded bg-base-100 p-4 flex flex-col items-between justify-start gap-4"}>
            <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
              <p>Référence: </p>
              <p>{devis.reference}</p>
            </div>

            <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
              <p>Date du devis: </p>
              <p>{updatedAtDate}</p>
            </div>

            <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
              <p>Date de début de la prestation: </p>
              <p>{debutAtDate}</p>
            </div>

            <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
              <p>Date de validité: </p>
              <p>{validite}</p>
            </div>

            <div className={"flex flex-wrap justify-between items-center gap-x-4"}>
              <p>Contact client: </p>
              <p>{contactClient}</p>
            </div>
          </div>
          <div id={"infos-client"}>
            <h2 className={"underline mb-4"}>Destinataire :</h2>
            <p>{client.nom} {client.prenom}</p>
            <p>{clientAdresseRue}</p>
            <p>{clientAdresseVille}</p>
          </div>
        </section>

        <section id={"tc-section"} className={"p-4 flex flex-col items-start justify-start w-full mb-8"}>
          <h2 className={"underline mb-4"}>Termes et conditions</h2>
          <div className={"bg-base-100 rounded w-full min-h-32 p-4"}>{tc}</div>
        </section>

        <section id="prestations-section" className="w-full border flex flex-col lg:flex-wrap lg:flex-row lg:justify-center lg:gap-5">
          <div className="hidden lg:grid lg:grid-cols-8 lg:items-end lg:justify-items-center lg:border-b lg:bg-base-100 lg:p-4 lg:w-full">
            <p>Description</p>
            <p>Quantité</p>
            <p>Prix unitaire HT</p>
            <p>Total HT</p>
            <p>TVA %</p>
            <p>TVA</p>
            <p>Total TTC</p>
            <p></p>
          </div>
          {prestations.map(prestation =>{
            return (
              <div key={prestation.id} className={`w-full p-4 ${
                      "lg:grid lg:grid-cols-8 lg:gap-x-2 lg:items-center lg:justify-items-center lg:border-none"
                  } ${
                      "border flex flex-col gap-y-2" // Affichage en card sur les petits écrans
                  }`}
              >
                <p className="font-bold lg:font-normal">{prestation.element.nom}</p>
                <PrestationCard nom={"Quantité:"} valeur={prestation.qty} />
                <PrestationCard nom={"Prix Unitaire HT:"} valeur={transformPriceToEuro(prestation.prixHT)} />
                <PrestationCard nom="Total HT" valeur={transformPriceToEuro(prestation.totalHT)} />
                <PrestationCard nom="Pourcentage de TVA:" valeur={prestation.tvaPercentage + "%"} />
                <PrestationCard nom="TVA: " valeur={transformPriceToEuro(prestation.tva)} />
                <PrestationCard nom="Total TTC:" valeur={transformPriceToEuro(prestation.totalTTC)} classname="font-bold" />

                <div className={`lg:hidden flex items-center gap-x-4 justify-center`}>
                  <PrestationModalTrigger isEditPrestation={prestation} id={devis?.id} />
                </div>
              <div className={"hidden lg:block"}><PrestationModalTrigger isEditPrestation={prestation} id={devis?.id} /></div>
            </div>
            )
          })}
        </section>
        <div className={"ml-4 mt-4"}><PrestationModalTrigger isEditPrestation={null} id={devis?.id}/></div>

        <section id={"prix-section"} className={"grid grid-cols-2 gap-x-4 items-end justify-items-end ml-auto mb-8 p-4"}>
          <div className="text-right">
            <p>Total HT: </p>
            <p>TVA: </p>
            <p>Total TTC: </p>
            {paidAtDate && <p className={"underline"}>Payé le: </p>}
          </div>
          <div className="text-right">
            <p className={""}>{prixHtCalcule}</p>
            <p>{tvaCalcule}</p>
            <p className={"font-bold"}>{totalTTCCalcule}</p>
            {paidAtDate && <p>{paidAtDate}</p>}
          </div>
        </section>

        <section id={"bottom-section"} className={"flex items-start justify-between w-full p-4"}>
          <div id={"entreprise-infos-section"}>
            <p>Siret: {entreprise.siret}</p>
            {entreprise.codeApe && <p>Code APE: {entreprise.codeApe}</p>}
            {entreprise.tvaIntracom && <p>Numéro de TVA intracommunautaire: {entreprise.tvaIntracom}</p>}
          </div>
          <div id={"contact-section"}>
            {entreprise.web && <p><a href={entreprise.web} target={"blank"} className={"underline"}>{entreprise.web}</a></p>}
            {entreprise.email && <p><a href={"mailto:" + entreprise.email}>{entreprise.email}</a></p>}
            {entreprise.telephone1 && <p>Téléphone 1: {entreprise.telephone1}</p>}
            {entreprise.telephone2 && <p>Téléphone2: {entreprise.telephone2}</p>}
          </div>
        </section>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </main>
  )
}

function PrestationCard({ nom, valeur, classname }) {
  return (
      <>
      <div className={`lg:hidden flex items-center gap-x-4 justify-center`}>
        <p >{nom}</p>
        <p className={classname}>{valeur}</p>
      </div>
      <p className={"hidden lg:block"}>{valeur}</p>
      </>
  )
}
