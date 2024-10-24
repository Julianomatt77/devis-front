import {Button} from "@/components/ui/button";

export default function CardWrapper(props: {data: any, type: string, isDashboard?: boolean}) {
    const {data, type, isDashboard} = props;
    // console.log(data)

    if (isDashboard) {
        if (type === "dashboardClient") {
            return (
                <div className={"flex flex-wrap justify-center gap-5"}>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {data.map((item: any) => {
                                return <DashboardCardClient data={item} key={item.id} />
                            })}
                        </ul>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={"flex flex-wrap justify-center gap-5"}>
            {data.map((item: any) => {
                if (type === "client") {
                    return <CardClient data={item} key={item.id} />
                }
            })}

        </div>
    )
}

export function CardClient(props: {data: any}) {
    const {data} = props;
    const {adresse, devis, email, id, nom, prenom, telephone} = data;
    let displayAdresse = '';

    if (adresse){
        const {complementaire, cp, numero,  pays, rue, ville} = adresse;
        const adresseParts = [];

        if (numero) adresseParts.push(numero + ',');
        if (rue) adresseParts.push(rue + ',');
        if (complementaire) adresseParts.push(complementaire + ',');
        if (cp) adresseParts.push(cp + ',');
        if (ville) adresseParts.push(ville + ',');
        if (pays) adresseParts.push(pays);

        displayAdresse = adresseParts.join(' ');
    }

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{nom} {prenom}</h2>
                <p>{displayAdresse || null}</p>
                <p className="card-subtitle">{telephone}</p>
                <p className="card-subtitle">{email}</p>
                <div className="card-actions justify-end">
                    <Button>Voir</Button>
                    <Button variant="secondary">Modifier</Button>
                    <Button variant="destructive">Supprimer</Button>
                </div>
            </div>
        </div>
    )
}

export function DashboardCardClient(props: {data: any}) {
    const {data} = props;
    const {devis, email, id, nom, prenom} = data;

    // console.log(devis)

    return (
        <li className="py-3 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-1 min-w-0 ms-4 gap-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {nom} {prenom}
                    </p>
                </div>
                <div className="flex flex-2 min-w-0 ms-4 gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {email}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    xx€
                </div>
            </div>
        </li>
    )
}