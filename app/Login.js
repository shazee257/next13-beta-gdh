'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import fetchAPI from '@/components/fetchAPI';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routingRoles } from '@/utils/constant';

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchAPI({
                method: 'post',
                endPoint: 'Clients/login',
                data: { email, password },
                params: { include: 'user' },
            });

            console.log("data response === ", response);

            if (response.status === 200) {
                // set token in cookie
                document.cookie = `accessToken=${response.data?.id}; path=/`;
                document.cookie = `userId=${response.data?.userId}; path=/`;
                document.cookie = `role=${(response.data?.user?.role).toLowerCase()}; path=/`;
                // set login data in local storage
                localStorage.setItem('firstName', response.data?.user?.firstName);
                localStorage.setItem('lastName', response.data?.user?.lastName);
                localStorage.setItem('role', (response.data?.user?.role).toLowerCase());
                localStorage.setItem('email', response.data?.user?.email);
                localStorage.setItem('image', response.data?.user?.imageUrl);
                localStorage.setItem('token', response.data?.id);
                localStorage.setItem('userId', response.data?.userId);
                // console.log("response.data?.user?.role === ", response.data?.user?.role);
                // console.log("routingRoles[response.data?.user?.role] === ", routingRoles[response.data?.user?.role]);
                router.push(`/${routingRoles[response.data?.user?.role]}`);
            } else {
                toast.error("Credentials are not correct!");
            }
        } catch (error) {
            console.log("error === ", error);
            toast.error("Server error!");
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <Paper className="md:w-6/12 py-10 px-8 max-w-sm" elevation={10} >
                <form className="space-y-6" action="#" onSubmit={LoginSubmit}>
                    <h3 className="text-2xl text-center font-medium text-gray-900 dark:text-white">Sign in to your account</h3>
                    <div>
                        <label className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Your password</label>
                        <input type="password" placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-start">
                        <Link href="#" className="text-[#056721] ml-auto text-sm hover:underline"><b>Forget Password?</b></Link>
                    </div>
                    <button type="submit"
                        className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#056721] hover:bg-[#034b14] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Login
                    </button>
                </form>
            </Paper>
            <ToastContainer />
        </div>
    )
}
