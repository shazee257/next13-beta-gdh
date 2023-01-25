import DashboardCard from '@/components/DashboardCard';
import {
    FaUserMd,
    FaUserInjured,
    FaUserTie,
    FaCalendarAlt,
    FaExchangeAlt,
} from 'react-icons/fa';
import MuiGrid from '@/components/MuiGrid';
import { cookies } from 'next/headers';
import { formatDate } from '@/utils';
import fetchAPI from '@/components/fetchAPI';

async function getDashboardData() {
    const nextCookies = cookies();
    const accessToken = nextCookies.get('accessToken').value;
    const role = nextCookies.get('role').value;
    const userId = nextCookies.get('userId').value;

    // get first and last date of current month
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 2);

    // https://api.digitalcaregdh.com/api/Appointments?filter[where][status][nlike]=Waiting&filter[where][and][0][createdAt][lt]=2023-02-01&filter[where][and][0][createdAt][gt]=2023-12-31
    // get appointments of current month
    const { data: appointments } = await fetchAPI({
        method: 'GET',
        endPoint: 'Appointments',
        params: {
            filter: {
                where: {
                    status: {
                        nlike: 'Waiting'
                    },
                    and: [
                        {
                            createdAt: {
                                lt: lastDay
                            }
                        },
                        {
                            createdAt: {
                                gt: firstDay
                            }
                        }
                    ]
                }
            }
        }
    });

    // https://api.digitalcaregdh.com/api/TransactionLogs?filter[where][type]=patient&filter[where][and][0][createdAt][lt]=2023-02-01&filter[where][and][0][createdAt][gt]=2023-12-31
    // get transactions of current month
    const { data: transactions } = await fetchAPI({
        method: 'GET',
        endPoint: 'TransactionLogs',
        params: {
            filter: {
                where: {
                    type: 'patient',
                    and: [
                        {
                            createdAt: {
                                lt: lastDay
                            }
                        },
                        {
                            createdAt: {
                                gt: firstDay
                            }
                        }
                    ]
                }
            }
        }
    });

    // https://api.digitalcaregdh.com/api/Clients 
    // get all users
    const { data: users } = await fetchAPI({
        method: 'GET',
        endPoint: 'Clients'
    });

    const patientList = users.filter(user => user.role === 'ROLE_PATIENT').map((patient) => {
        let obj = {};
        obj.id = patient.id;
        obj.name = `${patient.firstName} ${patient.lastName}`;
        obj.email = patient.email;
        obj.city = patient.personalDetails.city ? patient.personalDetails.city : 'N/A';
        obj.phone = patient.personalDetails.mobile ? patient.personalDetails.mobile : 'N/A';
        obj.assistantName = patient.createdBy ? patient.createdBy : 'N/A';
        obj.createdAt = formatDate(patient.createdAt);
        return obj;
    })

    const noOfDoctors = users.filter(user => user.role === 'MEDICAL_SPECIALIST').length;
    const noOfAssistants = users.filter(user => user.role === 'ROLE_ASSISTANT').length;
    const noOfPatients = users.filter(user => user.role === 'ROLE_PATIENT').length;

    return {
        noOfAppointments: appointments.length,
        noOfTransactions: transactions.length,
        noOfDoctors,
        noOfAssistants,
        noOfPatients,
        patientList
    }
}

export default async function AdminDashboard() {
    const { noOfAppointments, noOfTransactions, noOfDoctors, noOfAssistants, noOfPatients, patientList } = await getDashboardData();

    const columns = [
        { field: "id", headerName: "ID", width: 165, hide: true },
        { field: "name", headerName: "Patient Name", width: 220 },
        { field: "email", headerName: "Email", width: 230 },
        { field: "city", headerName: "City", width: 130 },
        { field: "phone", headerName: "Phone", width: 150 },
        { field: "assistantName", headerName: "Assistant Name", width: 200 },
        { field: "createdAt", headerName: "Created At", width: 130 },
    ];

    return (
        <div className="m-5">
            <span className="text-3xl font-bold">ADMIN DASHBOARD</span>
            <div className='flex flex-wrap justify-start my-4 mb-12'>
                <DashboardCard icon={<FaUserInjured color='#fff' size={26} />} title='Total Patients' count={noOfPatients} />
                <DashboardCard icon={<FaUserMd color='#fff' size={26} />} title='Total Doctors' count={noOfDoctors} />
                <DashboardCard icon={<FaUserTie color='#fff' size={26} />} title='Total Assistants' count={noOfAssistants} />
                <DashboardCard icon={<FaExchangeAlt color='#fff' size={26} />} title='Transactions' count={noOfTransactions} />
                <DashboardCard icon={<FaCalendarAlt color='#fff' size={26} />} title='Appointments' count={noOfAppointments} />
            </div>

            <h1 className="text-2xl font-bold">PATIENT LIST</h1>
            <MuiGrid data={patientList} columns={columns} />
        </div>
    )
}