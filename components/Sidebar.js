'use client';

import SidebarLogo from '../assets/images/SidebarLogo.png';
import UserAvatar from '../assets/images/Avatar.png';
import Image from 'next/image';
import Link from 'next/link';
import { sidebarMenuItems } from '@/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const [username, setUsername] = useState('');
    const [userImage, setUserImage] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const pathname = usePathname();

    useEffect(() => {
        const firstName = localStorage.getItem('firstName') || '';
        const lastName = localStorage.getItem('lastName') || '';
        setUsername(firstName + ' ' + lastName);

        const image = localStorage.getItem('image') || '';
        setUserImage(image);

        const role = localStorage.getItem('role') || '';
        setRole(role);

        const email = localStorage.getItem('email') || '';
        setEmail(email);
    }, [userImage])

    const imageUploadHandler = async (e) => {
        const file = e.target.files[0];

        if (!file || !email) return;

        const formData = new FormData();
        formData.append('uploadFile', file);

        const response = await fetchApi({
            method: 'POST',
            endPoint: 'Contents/etibb/upload',
            data: formData,
            contentType: true
        })

        // console.log("response", response);

        if (response.status === 200) {
            const image = response.data.result.files.uploadFile[0].name;

            const responseUpdateClientAPI = await fetchApi({
                method: 'POST',
                endPoint: 'Clients/upsertWithWhere',
                params: {
                    where: {
                        email: email
                    }
                },
                data: {
                    imageUrl: `https://api.digitalcaregdh.com/api/Contents/etibb/download/${image}`
                }
            })

            if (responseUpdateClientAPI.status === 200) {
                setUserImage(`https://api.digitalcaregdh.com/api/Contents/etibb/download/${image}`);
                localStorage.setItem('image', `https://api.digitalcaregdh.com/api/Contents/etibb/download/${image}`);
            }
        }
    }

    return (
        <div className="w-16 lg:w-3/12 bg-[#2e8cca] h-screen pt-40 lg:pt-0 lg:py-4 lg:max-w-xs">
            <div className='hidden lg:block lg:m-4'>
                <div className='py-10 flex justify-center'>
                    <Image src={SidebarLogo} alt="SideBar Image" width={150} height='auto' quality={5} priority={true} />
                </div>
                <div className='flex flex-col justify-center items-center mb-20'>
                    {/* upload file input */}
                    <input type="file" name="image" hidden accept="image/*"
                        onChange={imageUploadHandler} />
                    <div onClick={() => document.querySelector('input[type="file"]').click()}
                        className='flex justify-center items-center w-32 h-32 bg-white rounded-full cursor-pointer hover:opacity-70'>
                        {
                            userImage ?
                                <Image src={userImage} alt="SideBar Image" width={100} height={100} priority={true}
                                    className='rounded-full h-full w-full mx-4' />
                                :
                                <Image src={UserAvatar} alt="SideBar Image" width={100} height={100} />
                        }
                    </div>
                    <span className='text-white text-sm mt-2'></span>
                    <span className='text-white text-sm mt-2'>Welcome, {username}</span>
                </div>
            </div>
            <ul>
                {role && sidebarMenuItems[role].map(({ url, title, icon }) => (
                    <li key={url}
                        className='m-2 flex items-center justify-center lg:justify-start lg:m-2'>
                        <Link href={url}
                            className={`w-full flex items-center lg:px-2 space-x-2 rounded-md cursor-pointer text-white after:text-green-800  hover:text-green-500
                                ${pathname === url && 'bg-white text-green-500'}`}>
                            <div className='flex items-center w-56 h-10'>
                                <div className='pl-2.5 lg:px-4 flex items-center justify-center rounded-md'>{icon}</div>
                                <span className='hidden lg:block lg:w-40 text-lg'>{title}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}