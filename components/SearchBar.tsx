import {useRouter} from "next/navigation";
import {CircleX} from "lucide-react";

export default function SearchBar({search, placeholder}) {
    const router = useRouter();

    return (
        <div className="mb-4 relative">
            <input
                type="text"
                placeholder={placeholder}
                className="p-2 border border-gray-300 rounded w-full"
                value={search || ''}
                onChange={(e) => {
                    router.push('?search=' + e.target.value.toLowerCase());
                }}
            />
            {search && (
                <CircleX
                    className="absolute right-2 top-2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => {
                        router.push('?');
                    }}
                />
            )}
        </div>
    );
}