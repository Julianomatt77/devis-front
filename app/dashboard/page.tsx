import {getClients} from "@/lib/data/data-clients";
import CardWrapper from "@/components/cards";
import {getDevis} from "@/lib/data/data-devis";

export default async function DashboardPage() {
    const clients = await getClients();
    const clientsList = clients.data.slice(0, 5);;

    const devis = await getDevis();
    const devisList = devis.data;
    const activeDevisList = devisList.filter((devis) => !devis.deletedAt).slice(0, 5);

    return (
        <main className="w-full p-4 shadow sm:p-8 flex flex-wrap items-start justify-between gap-4">
            <section className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Derniers clients</h5>
                    <a href="/clients" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Tout voir
                    </a>
                </div>
                <CardWrapper data={clientsList} type="dashboardClient" isDashboard={true}/>
            </section>

            <section className="w-full max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Derniers devis</h5>
                    <a href="/devis" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        Tout voir
                    </a>
                </div>
                <CardWrapper data={activeDevisList} type="dashboardDevis" isDashboard={true}/>
            </section>
        </main>
    )
}