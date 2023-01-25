export default function DashboardCard({ icon, title, count }) {
    return (
        <div className='bg-[#2e8cca] flex justify-between items-center p-6 rounded-lg w-[370px] h-20 m-4'>
            <div className='flex justify-between items-center space-x-3'>
                <div>{icon}</div>
                <span className='text-white text-2xl font-bold'>{title}</span>
            </div>
            <span className='text-white text-3xl font-bold'>{count}</span>
        </div>
    )
}

