import {SignOut} from "@/app/ui/profile/profile-dropdown";
import React from "react";
import StarIcon from "@/app/ui/icons/Star";

export default function Rating({ rating: number }) {
    const roundedValue = Math.round(number);
    const stars = Array.from({ length: roundedValue }, (_, index) => index + 1);
    const emptyStars = 5 - roundedValue;
    
    return (
        <div className="rating flex flex-row">
            {stars.map((star, index) => (
                <StarIcon  className='ml-[1px]' key={index + Date.now()}/>
            ))}
            {[...Array(emptyStars)].map((star, index) => (
                <StarIcon  className='ml-[1px]' key={index + Date.now()} filled={false}/>
            ))}
        </div>
    );
};
