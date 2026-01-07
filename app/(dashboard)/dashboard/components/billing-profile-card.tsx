import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getBillers } from "@/actions/Billers"
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";

async function BillingProfileCard() {
    const { data: billers } = await getBillers();
    const avatarText = (name: string) => {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

        return initials;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <CardTitle className="text-xl">
                        Billing Profiles
                    </CardTitle>
                    <CardDescription>
                        Your saved billing profiles
                    </CardDescription>
                </div>
                <Button variant={'outline'} className="size-8 rounded-full" asChild>
                    <Link href='/dashboard/account'>
                        <ArrowRight />
                        <span className="sr-only">Explore biller id</span>
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="flex flex-row flex-wrap gap-3">
                {
                    billers.map((biller) => (
                        <React.Fragment key={biller.id}>
                            <div className="size-8 border border-muted-foreground rounded-full flex items-center justify-center text-muted-foreground text-sm font-semibold">{avatarText(biller.name)}</div>
                            <div className="flex flex-col">
                                <span className="text-sm">{biller.name}</span>
                                <span className="text-xs text-muted-foreground">{biller.email}</span>
                            </div>
                        </React.Fragment>
                    ))
                }
            </CardContent>
        </Card>
    )
}

export default BillingProfileCard