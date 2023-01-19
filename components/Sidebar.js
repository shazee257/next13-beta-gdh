'use client';

// import SidebarLogo from '../assets/images/SidebarLogo.png';
// import UserAvatar from '../assets/images/Avatar.png';
// import Image from 'next/image';

import Link from 'next/link';
import { sidebarMenuItems } from '@/utils';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-16 md:w-3/12 bg-[#2e8cca] h-screen pt-40 md:pt-0 md:py-4 md:max-w-xs">
            <div className='hidden md:block md:m-4'>
                <div className='py-10 flex justify-center'>
                    {/* <Image src={SidebarLogo} alt="SideBar Image" width={100} height={100} /> */}
                </div>
                <div className='flex justify-center items-center mb-20'>
                    <div className='flex justify-center items-center w-32 h-32 bg-white rounded-full cursor-pointer hover:opacity-70'>
                        {/* <Image src={UserAvatar} alt="SideBar Image" width={100} height={100} /> */}
                    </div>
                </div>
            </div>
            <div>
                <ul>
                    {sidebarMenuItems['admin'].map(({ url, title, icon }) => (
                        <li key={url}
                            className='m-2 flex items-center justify-center sm:justify-start sm:m-2'>
                            <Link href={url}
                                className={`w-full flex items-center md:px-2 space-x-2 rounded-md cursor-pointer text-white after:text-green-800  hover:text-green-500
                                ${pathname === url && 'bg-white text-green-500'}`}>
                                <div className='flex items-center w-56 h-10'>
                                    <div className='px-4 flex items-center justify-center rounded-md'>{icon}</div>
                                    <span className='hidden md:block text-md'>{title}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}