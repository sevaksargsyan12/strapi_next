'use client'
import {logoutAction} from "@/app/lib/auth/logout-action";
import avatar from '@/public/profile-avatar.png'
import React from "react";
import Image from 'next/image';
import {useState} from 'react'
import Link from 'next/link'
import {Avatar} from "@/app/ui/avatar";
import {User} from "@/app/lib/definitions";
import {useRouter} from 'next/navigation'


export default function ProfileDropDown({id, email}: Partial<User>) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} id="dropdownAvatarNameButton"
                    data-dropdown-toggle="dropdownAvatarName" className="rounded-full">
                <Image src={avatar.src} alt="avatar" width={48} height={48}/>
            </button>
            <div
                className={`${isOpen ? 'block opacity-1 fadeIn' : 'hidden opacity-0 fadeOut'} items-center z-10 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] absolute bg-white p-8 right-0 top-[58px] rounded-xl`}
                style={{'width': '221px', 'height': '286px'}}>
                {/*<div className="overflow-hidden w-[88px] h-[88px] rounded-full m-auto">*/}
                <Avatar/>
                <h4 className="m-auto  text-center font-inter font-semibold text-lg leading-9 text-center text-gray-800 mt-4">Hi
                    There!</h4>
                <p className="m-auto text-center font-inter font-mediu text-xs leading-4 text-center text-[#4B5563]">{email}</p>
                <div className="grid grid-cols-1 divide-y w-full bg-[#E5E7EB] h-px mt-3.5"></div>
                <div className="m-auto text-center mt-4">
                    <Link onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        router.push(`/dashboard/profile/${id}`);
                    }} href={`/dashboard/profile/${id}`}
                          className="font-inter text-link-blue font-semibold text-sm leading-6 text-blue-600 underline">
                        See details
                    </Link>
                </div>
                <SignOut/>
            </div>
        </div>
    )
}

function SignOut() {
    return (
        <form action={logoutAction} className='absolute top-1 right-1'>
            <button
                className="flex h-[28px] grow items-center justify-center gap-2 rounded-md bg-white p-2 text-xs font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <div className="hidden md:block">Sign Out</div>
            </button>
        </form>
    )
}


