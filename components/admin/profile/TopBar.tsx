import { LogOut, Plus } from 'lucide-react'
import React from 'react'

const TopBar = ({ handleLogOut }: { handleLogOut: any }) => {
    return (
        <div className="bg-white px-8 py-6 h-[100px]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                    <p className="mt-2 text-gray-600 text-sm">View your profile and you can sign out.</p>
                </div>
                <button
                    onClick={handleLogOut}
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className='hidden md:block text-sm'>Sign Out</span>
                </button>
            </div>
        </div>
    )
}

export default TopBar