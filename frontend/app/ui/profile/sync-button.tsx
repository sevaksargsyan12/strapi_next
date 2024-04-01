'use client'

import {useFormStatus} from 'react-dom'
import {Button} from "@/app/ui/button";
import {ArrowRightIcon} from "@heroicons/react/20/solid";

export function SyncButton() {
    //checks parent form status in server action
    const {pending} = useFormStatus()
    
    return (
        <>
            <Button className="mt-4 w-auto" disabled={pending}>
                {pending ? 'Synchronizing...' : 'Sync'} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
            </Button>
        </>
    );
}
