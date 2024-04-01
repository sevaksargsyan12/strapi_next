'use client'

import {createContext, Suspense, useEffect, useState} from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/dashboard/skeletons";
import { lusitana } from "@/app/ui/fonts";
import UsersList from "@/app/ui/dashboard/users/usersList";
import ReviewsList from "@/app/ui/dashboard/reviews/reviewList";
export const UserContext = createContext(undefined) as any;
export default function Page() {
    const [selectedUserData, setSelectedUserData] = useState(null);

    return (
        <UserContext.Provider value={{ selectedUserData, setSelectedUserData }}>
            <div className="flex flex-row max-w-[1312px] m-auto mt-6 lg:w-100-96px sm:w-11/12">
                <UsersList opened={selectedUserData?.companyId ?? false} />
                {selectedUserData?.companyId && <ReviewsList companyId={selectedUserData?.companyId} companyAddress={selectedUserData.companyAddress} companyName={selectedUserData.companyName}/>}
            </div>
        </UserContext.Provider>
  );
}
