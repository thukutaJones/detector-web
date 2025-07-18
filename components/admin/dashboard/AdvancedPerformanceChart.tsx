import { BarChart3, Calendar, Flame, Star } from 'lucide-react'
import React from 'react'

const AdvancedPerformanceChart = () => {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">AI Detection Performance</h2>
                        <p className="text-sm text-gray-500">Real-time accuracy and threat analysis</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300 text-sm font-medium">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Last 7 days
                    </button>
                    <button className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors duration-300 text-sm font-medium">
                        <Star className="w-4 h-4 inline mr-2" />
                        Insights
                    </button>
                </div>
            </div>
            <div className="h-80 bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5"></div>
                <div className="relative text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                        <Flame className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Advanced Analytics Ready</h3>
                    </div>
                    <div className="flex items-center justify-center space-x-4 mt-6">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdvancedPerformanceChart