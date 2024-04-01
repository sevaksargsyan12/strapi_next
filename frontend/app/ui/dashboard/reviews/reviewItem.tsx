import React from "react";
import {Review} from "@/app/lib/definitions";
import {Avatar} from "@/app/ui/avatar";
import Rating from "@/app/ui/dashboard/reviews/rating";
import GoogleIcon from "@/app/ui/icons/Google";
import {formatDateForShow} from "@/app/lib/utils";


export default function ReviewItem({image, rating, date, author, description}: Partial<Review>) {
    return (
        <div
            className="max-w-[622px] mx-auto px-4 flex md:flex-row justify-between flex-wrap bg-white px-2.5 mt-4 mb-6">
            <div className='user-info flex flex-row'>
                <div className="flex items-center mr-4">
                    {image && <Avatar height={40} src={image} width={40}/>}
                </div>
                <div className="flex flex-col items-center">
                    <div
                        className="text-sm font-semibold font-inter font-semibold text-gray-900 w-full">{author || 'Anonymous'}</div>
                    <div className='flex flex-row w-full mt-1'>
                        <GoogleIcon/>
                        <Rating rating={rating || 5}/>
                    </div>
                </div>
            </div>
            
            <div className="text-xs font-medium font-inter font-medium text-gray-700">
                {formatDateForShow(date.toString())}
            </div>
            <div className="text-sm font-normal font-inter font-weight-400 text-gray-700 w-full mt-5">
                {description}
            </div>
        </div>
    );
};
