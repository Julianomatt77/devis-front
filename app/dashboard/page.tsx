import {getClients} from "@/lib/data/data-clients";
import CardWrapper from "@/components/cards";

export default async function DashboardPage() {
    const data = await getClients();
    const clients = data.data;

    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Derniers clients</h5>
                <a href="/clients" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Tout voir
                </a>
            </div>
            <CardWrapper data={clients} type="dashboardClient" isDashboard={true}/>
        </div>
    )
}