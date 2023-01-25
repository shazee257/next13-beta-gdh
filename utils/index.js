import moment from 'moment';
import { MdOutlineDashboard } from "react-icons/md";

import {
    FaUserMd,
    FaUserInjured,
    FaUserTie,
    FaCalendarAlt,
    FaExchangeAlt,
    FaCalendarCheck,
    FaEdit,
    FaUserEdit,
    FaThinkPeaks,
} from "react-icons/fa";

import {
    BiMailSend,
    BiChat
} from "react-icons/bi";

export const sidebarMenuItems = {
    admin: [
        {
            url: '/admin',
            title: 'Dashboard',
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
        {
            url: '/admin/profile',
            title: 'Profile',
            icon: <FaUserEdit size={24} />
        },
    ],
    role_assistant: [
        {
            url: '/assistant',
            title: 'Dashboard',
            icon: <MdOutlineDashboard size={24} />
        },
        {
            url: '/assistant/appointments',
            title: 'Appointments',
            icon: <FaCalendarAlt size={24} />
        },
        {
            url: '/assistant/patients',
            title: 'Patients',
            icon: <FaUserInjured size={24} />
        },
        {
            url: '/assistant/rag-analysis',
            title: 'RAG Analysis',
            icon: <FaThinkPeaks size={24} />
        },
        {
            url: '/assistant/transactions',
            title: 'Transactions',
            icon: <FaExchangeAlt size={24} />
        },
        {
            url: '/assistant/messages',
            title: 'Messages',
            icon: <BiMailSend size={24} />
        },
        {
            url: '/assistant/chat',
            title: 'Live Chat',
            icon: <BiChat size={24} />
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
    role_patient: []
}

export const formatDate = (date) => moment(date).format('DD/MM/YYYY');