import https from 'https';
const axios = require('axios').default;
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserMd, FaUserInjured, FaUserTie, FaCalendarAlt, FaExchangeAlt, FaCalendarCheck, FaEdit } from "react-icons/fa";

axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
export function fetchApi({ method, endPoint, data, params }) {
    const headers = {
        'Content-Type': 'application/json',
    };

    const config = {
        method,
        url: `${process.env.NEXT_PUBLIC_BaseURL}/${endPoint}`,
        headers,
        params: params ? params : {},
        data: data ? data : {},
    };

    return axios(config);
}

export const sidebarMenuItems = {
    admin: [
        {
            url: '/admin',
            title: 'Admin Dashboard',
            icon: <MdOutlineDashboard size={24} />
        },
        {
            url: '/admin/doctors',
            title: 'Doctors',
            icon: <FaUserMd size={24} />
        },
        {
            url: '/admin/patients',
            title: 'Patients',
            icon: <FaUserInjured size={24} />
        },
        {
            url: '/admin/assistants',
            title: 'Assistants',
            icon: <FaUserTie size={24} />
        },
        {
            url: '/admin/appointments',
            title: 'Appointments',
            icon: <FaCalendarAlt size={24} />
        },
        {
            url: '/admin/transactions',
            title: 'Transactions',
            icon: <FaExchangeAlt size={24} />
        },
        {
            url: '/admin/quality-control',
            title: 'Quality Control',
            icon: <FaCalendarCheck size={24} />
        },
        {
            url: '/admin/feedback',
            title: 'Feedback',
            icon: <FaEdit size={24} />
        },
    ],
    medical_specialist: [
        {
            url: '/doctor',
            title: 'Doctor Dashboard',
            icon: <MdOutlineDashboard size={24} />
        },
        {
            url: '#',
            title: 'Doctors',
            icon: <FaUserMd size={24} />
        },
    ],
    assistant: [],
    patient: []
}
