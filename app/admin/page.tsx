"use client"

import React, { useState, useEffect } from 'react';
import {
    Shield,
    Users,
    BarChart3,
    Settings,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Eye,
    Activity,
    FileText,
    Home,
    UserCheck,
    Info,
    Mail,
    User,
    AlertTriangle,
    TrendingUp,
    Clock,
    CheckCircle,
    Bell,
    Search,
    Filter,
    MoreHorizontal,
    Zap,
    Globe,
    Camera,
    Brain,
    Target,
    Flame,
    Star,
    ArrowUp,
    ArrowDown,
    Play,
    Pause,
    Calendar,
    Download
} from 'lucide-react';
import Image from 'next/image';

const Dashboard = () => {
   
    const [activeTab, setActiveTab] = useState('overview');
    const [notifications, setNotifications] = useState(3);
    const [isLive, setIsLive] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

   

    const stats = [
        {
            title: 'Active Exams',
            value: '247',
            change: '+12.5%',
            changeType: 'up',
            icon: Clock,
            color: 'text-emerald-600',
            bgGradient: 'from-emerald-50 to-emerald-100',
            ringColor: 'ring-emerald-500/20',
            subtext: '18 starting soon'
        },
        {
            title: 'Violations Detected',
            value: '1,247',
            change: '+8.2%',
            changeType: 'up',
            icon: AlertTriangle,
            color: 'text-amber-600',
            bgGradient: 'from-amber-50 to-amber-100',
            ringColor: 'ring-amber-500/20',
            subtext: '23 critical alerts'
        },
        {
            title: 'System Accuracy',
            value: '99.7%',
            change: '+2.1%',
            changeType: 'up',
            icon: Target,
            color: 'text-green-600',
            bgGradient: 'from-green-50 to-green-100',
            ringColor: 'ring-green-500/20',
            subtext: 'AI confidence high'
        },
        {
            title: 'Total Users',
            value: '12,847',
            change: '+15.3%',
            changeType: 'up',
            icon: Users,
            color: 'text-blue-600',
            bgGradient: 'from-blue-50 to-blue-100',
            ringColor: 'ring-blue-500/20',
            subtext: '2,341 active now'
        }
    ];

    const recentActivity = [
        {
            action: 'Suspicious head movement detected',
            exam: 'Advanced Mathematics Final',
            time: '2 minutes ago',
            severity: 'high',
            confidence: '94%',
            user: 'Student #4821'
        },
        {
            action: 'New invigilator authenticated',
            exam: 'Physics Quantum Mechanics',
            time: '15 minutes ago',
            severity: 'low',
            confidence: '100%',
            user: 'Dr. Sarah Chen'
        },
        {
            action: 'Multiple device usage flagged',
            exam: 'Organic Chemistry Quiz',
            time: '32 minutes ago',
            severity: 'medium',
            confidence: '87%',
            user: 'Student #7293'
        },
        {
            action: 'Eye tracking anomaly detected',
            exam: 'Computer Science Algorithms',
            time: '45 minutes ago',
            severity: 'high',
            confidence: '91%',
            user: 'Student #1847'
        },
        {
            action: 'Exam session completed successfully',
            exam: 'English Literature Analysis',
            time: '1 hour ago',
            severity: 'low',
            confidence: '100%',
            user: 'Prof. Michael Torres'
        }
    ];

    const liveMetrics = [
        { label: 'Detection Engine', value: '99.2%', status: 'optimal', pulse: true },
        { label: 'Response Time', value: '24ms', status: 'excellent', pulse: false },
        { label: 'CPU Usage', value: '67%', status: 'normal', pulse: false },
        { label: 'Memory Usage', value: '45%', status: 'optimal', pulse: false }
    ];

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-6 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div>
                            <div className="flex items-center space-x-3">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                                    Admin Dashboard
                                </h1>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Good morning, Moth
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="w-64 pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500/50 transition-all duration-300"
                                />
                            </div>
                            <button className="p-2 rounded-xl hover:bg-gray-100/50 transition-all duration-300 relative">
                                <Bell className="w-5 h-5 text-gray-600" />
                                {notifications > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                        {notifications}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-semibold">Export Report</span>
                            </button>
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300">
                                <span className="text-white text-sm font-bold">JD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <main className="flex-1 overflow-auto bg-transparent">
                <div className="p-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
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

                    {/* Content Grid */}
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
                                {recentActivity.map((activity, index) => (
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
                                {liveMetrics.map((metric, index) => (
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

                    {/* Advanced Performance Chart */}
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
                                    <p className="text-sm text-gray-600">Interactive charts and deep insights will be displayed here</p>
                                </div>
                                <div className="flex items-center justify-center space-x-4 mt-6">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <ArrowUp className="w-4 h-4 text-emerald-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Live Monitoring</h3>
                            <p className="text-sm text-gray-600">View real-time exam feeds</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Settings className="w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Security Center</h3>
                            <p className="text-sm text-gray-600">Manage threat detection</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-purple-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Global Stats</h3>
                            <p className="text-sm text-gray-600">Worldwide detection data</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-amber-600" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">AI Training</h3>
                            <p className="text-sm text-gray-600">Enhance detection models</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;