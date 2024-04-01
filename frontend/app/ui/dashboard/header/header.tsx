import {SignOut} from "@/app/ui/profile/profile-dropdown";
import Logo from "@/app/ui/dashboard/header/logo";
import ProfileDropDown from "@/app/ui/profile/profile-dropdown";
import React from "react";
import {fetchUser} from "@/app/lib/data";
import Link from "next/link";

export default async function Header() {
    const myProfile = await fetchUser();
    
    return (
        <header className="bg-white h-16 w-full h-24">
            <div className="max-w-[1312px] mx-auto w-100-96px h-full flex md:flex-row justify-between items-center">
                <div className="w-2/5 flex-none">
                    <Link href="/dashboard">
                        <Logo/>
                    </Link>
                </div>
                {myProfile?.id && <div className="w-2/5 flex justify-end">
                    <ProfileDropDown id={myProfile.id} email={myProfile?.email || ''}/>
                </div>}
            </div>
        </header>
    );
}