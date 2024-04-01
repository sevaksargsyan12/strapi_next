'use client'
import React, {useContext} from "react";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import {Avatar} from "@/app/ui/avatar";
import {UserContext} from "@/app/dashboard/(overview)/page";

export default function UserItem({firstName, lastName, email, companyId, companyName, companyAddress}) {
    const fullName = `${firstName || ''} ${lastName || ''}`
    const { setSelectedUserData } = useContext(UserContext);
    const handleOpen = () => {
        setSelectedUserData({companyId, companyName, companyAddress});
    };
    
    return (
        <div className={`max-w-[1312px] mx-auto mb-4 h-full px-4 flex md:flex-row justify-between items-center bg-white px-2.5`} style={{height: '70px', borderRadius: '6px'}}>
            <div className='user-info flex flex-row'>
                <div className="flex items-center mr-5">
                    <Avatar height={50} width={50}/>
                </div>
                <div className="flex flex-column items-center">
                    <div>
                        {fullName.trim() && <div className="m-auto  font-inter font-semibold text-base text-gray-800">{fullName}</div>}
                        <p className="m-auto  font-inter font-medium text-xs leading-4 text-[#4B5563]">{email}</p>
                    </div>
                </div>
            </div>
            <div className="w-[24px] h-[24px] cursor-pointer" onClick={handleOpen}>
                <ChevronRightIcon color={'#4B5563'}/>
            </div>
        </div>
    );
}
