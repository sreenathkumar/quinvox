'use client'

import { searchClients } from "@/actions/Clients";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { searchBillers } from "@/actions/Billers";

interface ProfileType {
    id: string;
    name: string;
    email: string;
    address: string;
    country: string | null;
    type: string;
    phone: string | null;
}

function SearchClientInput({ profile, onChange, setValue, ...rest }: any) {
    const [searchResults, setSearchResults] = useState<ProfileType[]>([]);
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
            let searchData;

            if (profile === 'client') {
                const { data } = await searchClients(e.target.value);
                searchData = data;
            }

            if (profile === 'biller') {
                const { data } = await searchBillers(e.target.value);
                searchData = data;
            }

            if (searchData) {
                setSearchResults(searchData);
            } else {
                setSearchResults([]);
            }
        }, 500);
    }

    // handle selecting a search result
    const handleSearchResult = (pro: ProfileType) => {
        if (!setValue) return;
        setValue(`${profile}Id`, pro.id);
        setValue(`${profile}Type`, pro.type);
        setValue(`${profile}Name`, pro.name);
        setValue(`${profile}Email`, pro.email);
        setValue(`${profile}Address`, pro.address);

        setSearchResults([]);
    }

    return (
        <div className="relative">
            <Input
                {...rest}
                placeholder={`${profile} Name`}
                onChange={handleSearch}
                onFocus={() => setIsFocused(true)}
                onBlur={() => { setTimeout(() => setIsFocused(false), 200) }}
            />
            {
                (isFocused && searchResults.length > 0) && (
                    <div className="flex flex-col absolute z-10 border border-gray-600 rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                        {
                            searchResults.map((result) => (
                                <Button
                                    variant={'ghost'}
                                    key={result.id}
                                    className="flex flex-col items-start px-4 py-2 rounded-md hover:bg-muted cursor-pointer h-auto w-full text-left"
                                    onClick={() => handleSearchResult(result)}
                                >
                                    <span className="font-medium">{result.name}</span>
                                    <span className="text-sm text-gray-500">{result.email}</span>
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