"use client";
import {UpdateUserDto, User} from "@/app/lib/definitions";
import {insertReviews, updateUser} from "@/app/lib/actions";
import {
    UserIcon,
    MapIcon,
    MapPinIcon
} from "@heroicons/react/24/outline";
import {lusitana} from "@/app/ui/fonts";
import {useState} from "react";
import {getCompanyReviews} from "@/app/lib/actions";
import _ from 'lodash';
import {SyncButton} from "@/app/ui/profile/sync-button";

export default function ProfileForm({user}: { user: User }) {
    const [toggle, setToggle] = useState(false);
    const [errorSync, setErrorSync] = useState('');
    
    const handleSubmit = async (formData) => {
        setErrorSync('');
        
        try {
            const companyName = formData.get('companyName');
            const companyAddress = formData.get('companyAddress');
            const userProfileData: Partial<UpdateUserDto> = {};
            
            if (user.firstName !== formData.get('firstName')) {
                userProfileData.firstName = formData.get('firstName');
            }
            
            if (user.lastName !== formData.get('lastName')) {
                userProfileData.lastName = formData.get('lastName');
            }
            
            if (toggle) {
                const data = await getCompanyReviews(companyName, companyAddress, 20);
                if (!data || data?.error) {
                    setErrorSync(data?.error || 'Error occurred while fetching data...');
                    return;
                    
                } else {
                    if (_.isEmpty(data)) {
                        setErrorSync('There is no any data for this company...');
                        return;
                    } else {
                        const {companyAddress, companyName, companyId, reviews} = data;
                        const insertedReviews = await insertReviews(reviews);
                        if (!insertedReviews?.error && insertedReviews) {
                            await updateUser({
                                id: user.id,
                                companyAddress,
                                companyName,
                                companyId,
                                reviewCreationDate: new Date(),
                                ...userProfileData,
                            })
                        } else {
                            setErrorSync('Reviews were not inserted...');
                            return;
                        }
                    }
                }
            } else if (!_.isEmpty(userProfileData)) {
                const data = await updateUser({id: user.id,reviewCreationDate: new Date(), ...userProfileData});
                
                if (data?.error) {
                    setErrorSync('Failed to update user...');
                }
            }
        } catch (e) {
            console.error('Error ->',e);
        }
    }
    
    return (
        <form className="space-y-3 m-auto profile-form" style={{maxWidth: '600px'}} action={handleSubmit}>
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                    Here you can sync reviews of company with your account
                </h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="firstname"
                        >
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                required
                                min={1}
                                defaultValue={user.firstName || ''}
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="firstname"
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                            />
                            <UserIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="lastname"
                        >
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                required
                                min={1}
                                defaultValue={user.lastName || ''}
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="lastname"
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                            />
                            <UserIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 mt-5"></div>
                    <div className="mt-5">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" name="sync" className="sr-only peer"
                                   onChange={() => setToggle(!toggle)}/>
                            <div
                                className="relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span
                                className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Sync google reviews</span>
                        </label>
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="companyName"
                        >
                            CompanyInfo Name *
                        </label>
                        <div className="relative">
                            <input
                                disabled={!toggle}
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="companyName"
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                required
                            />
                            <MapIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="companyAddress"
                        >
                            CompanyInfo Address *
                        </label>
                        <div className="relative">
                            <input
                                disabled={!toggle}
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="companyAddress"
                                type="text"
                                name="companyAddress"
                                placeholder="Company Address"
                                required
                            />
                            <MapPinIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                        </div>
                    </div>
                </div>
                <SyncButton/>
                {errorSync ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-2 rounded relative"
                         role="alert">
                        <span className="block sm:inline">{errorSync}</span>
                    </div>
                ) : null}
            </div>
        </form>
    );
}
