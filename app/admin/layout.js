import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-1'>
                <Header />
                {children}
            </div>
        </div>
    )
}
