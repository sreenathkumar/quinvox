'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { type Paddle, initializePaddle } from '@paddle/paddle-js'


const PlanContext = createContext<{
    isAnnual: boolean;
    setIsAnnual: React.Dispatch<React.SetStateAction<boolean>>;
    paddle?: Paddle;
} | null>(null);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAnnual, setIsAnnual] = useState(true);
    const [paddle, setPaddle] = useState<Paddle>();

    useEffect(() => {
        initializePaddle({
            environment: process.env.NEXT_PUBLIC_PADDLE_ENV as 'sandbox' | 'production',
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,
            checkout: {
                settings: {
                    allowLogout: false,
                    displayMode: 'overlay',
                    locale: 'en',
                    theme: 'dark'
                },
            },
            eventCallback: (data) => {
                console.log('data inside eventcallback: ', data);
            }
        }).then((paddleInstance) => {
            if (paddleInstance) {
                setPaddle(paddleInstance);
            }
        });
    }, []);


    return (
        <PlanContext.Provider value={{ isAnnual, setIsAnnual, paddle }}>
            {children}
        </PlanContext.Provider>
    );
}

export const usePlan = () => {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used within a PlanProvider");
    }

    const { isAnnual, setIsAnnual, paddle } = context;

    return { isAnnual, setIsAnnual, paddle };
}