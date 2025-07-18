import { Activity, AlertTriangle, Brain, CheckCircle, Eye, Filter, MoreHorizontal } from 'lucide-react'
import React from 'react'

const ContentGrid = ({ recentActivity, liveMetrics }: { recentActivity: any; liveMetrics: any }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Activity Feed */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Live Activity Feed</h2>
                            <p className="text-sm text-gray-500">Real-time detection events</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-300 text-sm font-medium">
                            <Filter className="w-4 h-4 inline mr-2" />
                            Filter
                        </button>
                        <button className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors duration-300 text-sm font-medium">
                            View All
                        </button>
                    </div>
                </div>
                <div className="space-y-4">
                    {recentActivity.map((activity: any, index: number) => (
                        <div key={index} className="group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                            <div className="relative flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50/50 transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full shadow-lg ${activity.severity === 'high' ? 'bg-red-500 shadow-red-500/50' :
                                        activity.severity === 'medium' ? 'bg-yellow-500 shadow-yellow-500/50' :
                                            'bg-green-500 shadow-green-500/50'
                                        } ${activity.severity === 'high' ? 'animate-pulse' : ''}`}></div>
                                    <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                        {activity.severity === 'high' ? (
                                            <AlertTriangle className="w-4 h-4 text-red-600" />
                                        ) : activity.severity === 'medium' ? (
                                            <Eye className="w-4 h-4 text-yellow-600" />
                                        ) : (
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
                                            {activity.confidence}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <p className="text-xs text-gray-600">{activity.exam}</p>
                                        <span className="text-xs text-gray-400">•</span>
                                        <p className="text-xs text-gray-500">{activity.user}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-xs text-gray-400 font-medium">{activity.time}</span>
                                    <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live System Metrics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100/50">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">System Metrics</h2>
                            <p className="text-sm text-gray-500">Live performance data</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    {liveMetrics.map((metric: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors duration-300">
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${metric.status === 'optimal' ? 'bg-green-500' :
                                    metric.status === 'excellent' ? 'bg-blue-500' :
                                        'bg-yellow-500'
                                    } ${metric.pulse ? 'animate-pulse' : ''}`}></div>
                                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-gray-900">{metric.value}</span>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${metric.status === 'optimal' ? 'bg-green-100 text-green-700' :
                                    metric.status === 'excellent' ? 'bg-blue-100 text-blue-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {metric.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ContentGrid