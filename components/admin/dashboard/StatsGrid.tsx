import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react'

const StatsGrid = ({ stats }: { stats: any;}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat: any, index: number) => (
                <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50 ring-1 ${stat.ringColor} group-hover:scale-105`}>
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-14 h-14 bg-gradient-to-br ${stat.bgGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                            <div className="flex items-center space-x-2">
                                {stat.changeType === 'up' ? (
                                    <ArrowUp className="w-4 h-4 text-green-600" />
                                ) : (
                                    <ArrowDown className="w-4 h-4 text-red-600" />
                                )}
                                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                        <p className="text-sm text-gray-600 font-medium mb-2">{stat.title}</p>
                        <p className="text-xs text-gray-500">{stat.subtext}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatsGrid