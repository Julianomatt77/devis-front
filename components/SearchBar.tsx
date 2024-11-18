'use client';

import {useRouter, useSearchParams} from "next/navigation";
import {CircleX} from "lucide-react";
import {Suspense, useEffect} from 'react';

export default function SearchBar({search, placeholder, clientId, refreshSearch, refreshClient}) {
    const router = useRouter();
    const searchParams = useSearchParams()
    search = searchParams.get('search')?.toLowerCase()
    clientId = searchParams.get('client')

    useEffect(() => {
        if (clientId) {
            refreshClient(clientId)
        }
    }, [clientId]);

    return (
        <Suspense fallback={<div>Chargement...</div>}>
        <div className="mb-4 relative">
            <input
                type="text"
                placeholder={placeholder}
                className="p-2 border border-gray-300 rounded w-full"
                value={search || ''}
                onChange={(e) => {
                    const newSearchValue = e.target.value.toLowerCase();
                    refreshSearch(newSearchValue);
                    router.push('?search=' + newSearchValue);
                }}
            />
            {search && (
                <CircleX
                    className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => {
                        refreshSearch('');
                        router.push('?');
                    }}
                />
            )}
        </div>
        </Suspense>
    );
}