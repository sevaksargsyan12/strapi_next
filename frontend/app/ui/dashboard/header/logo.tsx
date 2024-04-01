import Image from 'next/image';
import React from 'react';
import logo from '@/public/logo.png'

interface LogoProps {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
}

const Logo: React.FC<LogoProps> = ({src = logo.src, alt = 'Lorem ipsum company', width = 184, height = 40}) => {
    return (
        <div>
            <Image src={src} alt={alt} width={width} height={height} priority quality={75}/>
        </div>
    );
};

export default Logo;