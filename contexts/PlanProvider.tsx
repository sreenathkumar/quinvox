'use client';

import { createContext, use, useContext, useState } from "react";


const PlanContext = createContext<{
    isAnnual: boolean;
    setIsAnnual: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <PlanContext.Provider value={{ isAnnual, setIsAnnual }}>
            {children}
        </PlanContext.Provider>
    );
}

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used within a PlanProvider");
    }

    const { isAnnual, setIsAnnual } = context;

    return { isAnnual, setIsAnnual };
}