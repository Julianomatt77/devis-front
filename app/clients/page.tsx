import {getClients} from "@/lib/data";
import ClientsPage from "@/components/clientsPage";
import { Suspense } from 'react';

export const metadata = {
    title: 'Devis Generator/Clients',
};

export default async function Page() {
    const data = await getClients();

    return(
        <Suspense>
            <ClientsPage data={data} />
        </Suspense>
    )
}
