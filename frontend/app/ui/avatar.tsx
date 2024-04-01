import avatarBig from "@/public/user-big.png";
import React from "react";
import Image from 'next/image';

export type AvatarProps = {
    width?: number;
    height?: number;
    alt?: string;
    src?: string;
}

export function Avatar({width = 88, height = 88, alt = 'User', src = avatarBig.src}: AvatarProps) {
    return (
        <div className={`overflow-hidden rounded-full m-auto`} style={{height: height + 'px', width: width + 'px'}}>
            <Image src={src} alt={alt} width={width + 12} height={height + 12}/>
        </div>
    )
}