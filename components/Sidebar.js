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
        <div className="w-16 lg:w-3/12 bg-[#2e8cca] h-screen pt-40 lg:pt-0 lg:py-4 lg:max-w-xs">
            <div className='hidden lg:block lg:m-4'>
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
                            className='m-2 flex items-center justify-center lg:justify-start lg:m-2'>
                            <Link href={url}
                                className={`w-full flex items-center lg:px-2 space-x-2 rounded-md cursor-pointer text-white after:text-green-800  hover:text-green-500
                                ${pathname === url && 'bg-white text-green-500'}`}>
                                <div className='flex items-center w-56 h-10'>
                                    <div className='px-3 flex items-center justify-center rounded-md'>{icon}</div>
                                    <span className='hidden lg:block text-[14px]'>{title}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}