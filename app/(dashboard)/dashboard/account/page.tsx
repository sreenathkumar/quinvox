import { getBillers } from "@/actions/Billers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import isServerAuthenticated from "@/lib/check-server-auth"
import BillerForm from "./components/biller-form";
import SingleBiller from "./components/single-biller-card";
import { Plus } from "lucide-react";

async function AccountPage() {
    const { user } = await isServerAuthenticated();
    const { data: billers } = await getBillers();
    return (
        <div className="px-5 py-6">
            <div className="flex items-center gap-10">
                <Avatar className="size-24">
                    <AvatarImage src={user?.image || undefined} className="rounded-full bg-muted" />
                    <AvatarFallback className="text-4xl font-bold">{user?.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-extrabold">{user?.name}</h2>
                    <p className="text-base text-muted-foreground ">{user?.email}</p>
                </div>
            </div>
            <Card className="mt-16">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <CardTitle>
                            Billing profiles
                        </CardTitle>
                        <CardDescription>
                            Manage your billing profiles and payment methods.
                        </CardDescription>
                    </div>
                    {billers.length > 0 && (
                        <BillerForm
                            trigger={
                                <Button variant={'outline'}>
                                    Create profile
                                    <Plus />
                                </Button>
                            }
                        />
                    )}
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center py-10">
                    {
                        billers.length > 0 ? (
                            <ul className="list-disc space-y-2 w-full s">
                                {billers.map((biller) => (
                                    <SingleBiller key={biller.id} {...biller} />
                                ))}
                            </ul>
                        ) : (
                            <>
                                <p className="text-base font-medium text-muted-foreground">
                                    No billing profiles found.
                                </p>
                                <BillerForm
                                    trigger={
                                        <Button variant={'link'}>Create profile</Button>
                                    }
                                />
                            </>
                        )
                    }
                </CardContent>
            </Card>

        </div>
    )
}

export default AccountPage