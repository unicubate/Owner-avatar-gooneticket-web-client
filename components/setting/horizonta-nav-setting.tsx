import { usePathname } from 'next/navigation';
import React from 'react'


const HorizontalNavSetting: React.FC = () => {
    const pathname = usePathname();
    //const isActive = pathname === item.href;
    return (
        <>
            <div className="w-full pb-1 overflow-x-auto">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px space-x-10">
                        <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Profile </a>

                        <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Password </a>

                        <a href="#" className="py-4 text-sm font-medium text-indigo-600 transition-all duration-200 border-b-2 border-indigo-600 whitespace-nowrap"> Team </a>

                        <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Notification </a>

                        <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Integrations </a>

                        <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Licenses </a>
                    </nav>
                </div>
            </div>
        </>
    )
}

export { HorizontalNavSetting }