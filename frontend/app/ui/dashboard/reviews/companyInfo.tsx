import React, {useContext} from "react";
import {Company} from "@/app/lib/definitions";
import {XMarkIcon} from "@heroicons/react/24/outline";
import MapPinIcon from "@/app/ui/icons/MapPin";
import {UserContext} from "@/app/dashboard/(overview)/page";


export default function CompanyInfo({companyName, companyAddress, companyId}: Partial<Company>) {
    const { setSelectedUserData } = useContext(UserContext);
    
    const handleClose = () => {
        setSelectedUserData({companyId :''});
    };
    return (
        <div className="mx-auto w-full h-24 flex flex-wrap md:flex-row justify-between items-center bg-white px-2.5 pl-4">
            <div
                className="max-w-[622px] mx-auto mt-2 flex-wrap w-full h-full px-4 flex md:flex-row justify-between items-center bg-white px-2.5">
                <div className='mt-1 flex flex-row w-9/12'>
                    <div className="flex flex-column items-center">
                        <div>
                            <div
                                className="m-auto text-lg font-inter font-semibold text-base text-gray-800">{companyName}</div>
                            <div className="user-info flex flex-row  pt-1.5">
                                <MapPinIcon/>
                                <p className="m-auto font-inter font-medium text-sm leading-4 ml-1 text-[#4B5563] sm:w-9/12 lg:w-full md:w-1/2 sm:overflow-hidden sm:text-ellipsis sm:truncate">{companyAddress}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[24px] h-[24px] cursor-pointer mt-1 mr-1" onClick={handleClose}>
                    <XMarkIcon width={28} height={28} color={'#000'}/>
                </div>
                <div className="grid grid-cols-1 divide-y w-full bg-[#E5E7EB] h-px"></div>
            </div>
        </div>
    );
};
