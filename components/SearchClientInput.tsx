'use client'

import { searchClients } from "@/actions/Clients";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ClientType {
    id: string;
    name: string;
    email: string;
    address: string;
    country: string | null;
    type: string;
    phone: string | null;
}

function SearchClientInput({ onChange, setValue, ...rest }: any) {
    const [searchResults, setSearchResults] = useState<ClientType[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const timer = useRef<NodeJS.Timeout | null>(null);

    // handle client search logic here
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);

        // search in database with debounce
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(async () => {
            const { data } = await searchClients(e.target.value);

            if (data) {
                setSearchResults(data);
            } else {
                setSearchResults([]);
            }
        }, 500);
    }

    // handle selecting a search result
    const handleSearchResult = (client: ClientType) => {
        if (!setValue) return;
        setValue('clientType', client.type);
        setValue('clientName', client.name);
        setValue('clientEmail', client.email);
        setValue('clientAddress', client.address);

        setSearchResults([]);
    }
    return (
        <div className="relative">
            <Input
                {...rest}
                placeholder="Client Name"
                onChange={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => { setTimeout(() => setIsFocused(false), 200) }}
            />
            {
                (isFocused && searchResults.length > 0) && (
                    <div className="flex flex-col absolute z-10 border border-gray-600 rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                        {
                            searchResults.map((client) => (
                                <Button
                                    variant={'ghost'}
                                    key={client.id}
                                    className="flex flex-col items-start px-4 py-2 rounded-md hover:bg-muted cursor-pointer h-auto w-full text-left"
                                    onClick={() => handleSearchResult(client)}
                                >
                                    <span className="font-medium">{client.name}</span>
                                    <span className="text-sm text-gray-500">{client.email}</span>
                                </Button>
                            ))
                        }
                    </div>
                )
            }
        </div>


    )
}

export default SearchClientInput