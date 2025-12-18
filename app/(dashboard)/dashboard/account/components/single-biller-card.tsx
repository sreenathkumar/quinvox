import { Button } from "@/components/ui/button";
import { BillerData } from "@/lib/definitions";
import BillerForm from "./biller-form";
import DeleteBtn from "./delete-btn";


interface SingleBillerProps extends BillerData {
    id: string;
    updatedAt: Date;
    createdAt: Date;
}

function SingleBiller({ id, name, type, email, phone, country, address, updatedAt }: SingleBillerProps) {
    //generate avatar text from name
    const avatarText = () => {
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

        return initials;
    }

    return (
        <li className="flex flex-col items-center rounded-md bg-sidebar py-4 px-6 gap-4">
            <div className="flex gap-3 items-center justify-between w-full">
                <div className="flex gap-3 items-center">
                    <div className="size-10 border border-white rounded-full flex items-center justify-center text-white font-bold">
                        {avatarText()}
                    </div>

                    <div className="flex flex-col">
                        <span className="font-semibold text-lg">{name}</span>
                        <span className="text-sm text-muted-foreground">
                            {type}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <div className="text-right">
                        <span className="text-sm font-bold text-muted-foreground">Email: </span>
                        <span className="text-sm font-medium text-muted-foreground">{email}</span>
                    </div>
                    <div className="text-center">
                        <span className="text-sm font-bold text-muted-foreground">Phone: </span>
                        <span className="text-sm font-medium text-muted-foreground">{phone}</span>
                    </div>
                    <div className="text-center">
                        <span className="text-sm font-bold text-muted-foreground">Address: </span>
                        <span className="text-sm font-medium text-muted-foreground">{address + ', ' + country}</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 items-center justify-between w-full">
                <span className="text-xs text-muted-foreground">Last updated: {new Date(updatedAt).toLocaleDateString()}</span>
                <div className="flex gap-3 items-center">
                    <BillerForm
                        mode="edit"
                        trigger={
                            <Button variant={'link'} className="p-0 text-xs h-auto">Edit</Button>
                        }
                        defaultData={{
                            name,
                            type,
                            email,
                            phone,
                            country,
                            address,
                        }}
                        billerId={id}
                    />
                    <DeleteBtn id={id} />
                </div>
            </div>
        </li>
    )
}

export default SingleBiller