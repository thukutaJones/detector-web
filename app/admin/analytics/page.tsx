"use client"

import React, { useState, useEffect } from 'react';
import {
    Users,
    Shield,
    BookOpen,
    TrendingUp,
    TrendingDown,
    Calendar,
    Download,
    Eye,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Activity,
    Clock,
    MapPin,
    FileText,
    Filter,
    ChevronDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const AnalyticsDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [dateRange, setDateRange] = useState('7'); // days
    const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // Sample data for user analytics
    const userAnalyticsData = [
        { date: '2024-01-10', activeUsers: 45, newUsers: 8, totalLogins: 127 },
        { date: '2024-01-11', activeUsers: 52, newUsers: 12, totalLogins: 143 },
        { date: '2024-01-12', activeUsers: 48, newUsers: 6, totalLogins: 134 },
        { date: '2024-01-13', activeUsers: 58, newUsers: 15, totalLogins: 167 },
        { date: '2024-01-14', activeUsers: 62, newUsers: 9, totalLogins: 189 },
        { date: '2024-01-15', activeUsers: 71, newUsers: 18, totalLogins: 203 },
        { date: '2024-01-16', activeUsers: 68, newUsers: 11, totalLogins: 195 }
    ];

    // Sample data for detection analytics
    const detectionData = [
        { date: '2024-01-10', totalDetections: 23, trueDetections: 18, falseDetections: 5 },
        { date: '2024-01-11', totalDetections: 31, trueDetections: 24, falseDetections: 7 },
        { date: '2024-01-12', totalDetections: 19, trueDetections: 16, falseDetections: 3 },
        { date: '2024-01-13', totalDetections: 42, trueDetections: 35, falseDetections: 7 },
        { date: '2024-01-14', totalDetections: 28, trueDetections: 22, falseDetections: 6 },
        { date: '2024-01-15', totalDetections: 37, trueDetections: 31, falseDetections: 6 },
        { date: '2024-01-16', totalDetections: 34, trueDetections: 28, falseDetections: 6 }
    ];

    // Sample data for exam analytics by room
    const examsByRoom = [
        { room: 'Room A101', exams: 34, capacity: 40, utilization: 85 },
        { room: 'Room A102', exams: 28, capacity: 35, utilization: 80 },
        { room: 'Room B201', exams: 41, capacity: 45, utilization: 91 },
        { room: 'Room B202', exams: 32, capacity: 40, utilization: 80 },
        { room: 'Room C301', exams: 25, capacity: 30, utilization: 83 },
        { room: 'Room C302', exams: 38, capacity: 40, utilization: 95 },
        { room: 'Room D401', exams: 29, capacity: 35, utilization: 83 }
    ];

    // Detection pie chart data
    const detectionPieData = [
        { name: 'True Detections', value: 174, color: '#16a34a' },
        { name: 'False Detections', value: 40, color: '#dc2626' }
    ];

    // Time series data for exam completion
    const examTimeData = [
        { time: '08:00', completedExams: 5 },
        { time: '09:00', completedExams: 12 },
        { time: '10:00', completedExams: 23 },
        { time: '11:00', completedExams: 34 },
        { time: '12:00', completedExams: 28 },
        { time: '13:00', completedExams: 19 },
        { time: '14:00', completedExams: 31 },
        { time: '15:00', completedExams: 25 },
        { time: '16:00', completedExams: 18 },
        { time: '17:00', completedExams: 8 }
    ];

    const dateRangeOptions = [
        { value: '1', label: 'Last 24 Hours' },
        { value: '7', label: 'Last 7 Days' },
        { value: '30', label: 'Last 30 Days' },
        { value: '90', label: 'Last 90 Days' }
    ];

    const handleExportReport = async () => {
        setIsExporting(true);
        // Simulate export process
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create and download a sample report
        const reportData = {
            date: selectedDate,
            userAnalytics: {
                totalActiveUsers: 68,
                newUsers: 89,
                totalLogins: 1558
            },
            detectionAnalytics: {
                totalDetections: 214,
                trueDetections: 174,
                falseDetections: 40,
                accuracy: 81.3
            },
            examAnalytics: {
                totalExams: 227,
                totalRooms: 7,
                averageUtilization: 85.3
            }
        };

        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-report-${selectedDate}.json`;
        a.click();
        URL.revokeObjectURL(url);

        setIsExporting(false);
    };

    const StatCard = ({ title, value, change, icon: Icon, trend, color }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <div className="mt-4 flex items-center">
                {trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
        </div>
    );

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-900">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                        <p className="mt-2 text-gray-600">Monitor system performance and user activity</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Date Range Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDateRangeDropdown(!showDateRangeDropdown)}
                                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="font-medium text-gray-700">
                                    {dateRangeOptions.find(option => option.value === dateRange)?.label}
                                </span>
                                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
                            </button>

                            {showDateRangeDropdown && (
                                <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg right-0">
                                    {dateRangeOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setDateRange(option.value);
                                                setShowDateRangeDropdown(false);
                                            }}
                                            className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${dateRange === option.value ? 'bg-green-50 text-green-600' : 'text-gray-700'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Date Picker */}
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        />

                        {/* Export Button */}
                        <button
                            onClick={handleExportReport}
                            disabled={isExporting}
                            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isExporting ? (
                                <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Download className="w-5 h-5 mr-2" />
                            )}
                            {isExporting ? 'Exporting...' : 'Export Report'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-8">
                {/* User Analytics Section */}
                <div className="mb-8">
                    <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">User Analytics</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard
                            title="Active Users"
                            value="68"
                            change="+12.5%"
                            icon={Users}
                            trend="up"
                            color="bg-blue-500"
                        />
                        <StatCard
                            title="New Users"
                            value="89"
                            change="+23.1%"
                            icon={TrendingUp}
                            trend="up"
                            color="bg-green-500"
                        />
                        <StatCard
                            title="Total Logins"
                            value="1,558"
                            change="+8.3%"
                            icon={Activity}
                            trend="up"
                            color="bg-purple-500"
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity Trends</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={userAnalyticsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="activeUsers"
                                    stackId="1"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.6}
                                    name="Active Users"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="newUsers"
                                    stackId="1"
                                    stroke="#10b981"
                                    fill="#10b981"
                                    fillOpacity={0.6}
                                    name="New Users"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detection Analytics Section */}
                <div className="mb-8">
                    <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                            <Shield className="w-5 h-5 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Detection Analytics</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <StatCard
                            title="Total Detections"
                            value="214"
                            change="+15.2%"
                            icon={Eye}
                            trend="up"
                            color="bg-yellow-500"
                        />
                        <StatCard
                            title="True Detections"
                            value="174"
                            change="+18.7%"
                            icon={CheckCircle}
                            trend="up"
                            color="bg-green-500"
                        />
                        <StatCard
                            title="False Detections"
                            value="40"
                            change="-5.3%"
                            icon={XCircle}
                            trend="down"
                            color="bg-red-500"
                        />
                        <StatCard
                            title="Accuracy Rate"
                            value="81.3%"
                            change="+3.2%"
                            icon={AlertTriangle}
                            trend="up"
                            color="bg-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Trends</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={detectionData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="date" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="trueDetections"
                                        stroke="#16a34a"
                                        strokeWidth={3}
                                        name="True Detections"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="falseDetections"
                                        stroke="#dc2626"
                                        strokeWidth={3}
                                        name="False Detections"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={detectionPieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {detectionPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Exam Analytics Section */}
                <div className="mb-8">
                    <div className="flex items-center mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <BookOpen className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Exam Analytics</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <StatCard
                            title="Total Exams"
                            value="227"
                            change="+19.4%"
                            icon={BookOpen}
                            trend="up"
                            color="bg-green-500"
                        />
                        <StatCard
                            title="Active Rooms"
                            value="7"
                            change="0%"
                            icon={MapPin}
                            trend="up"
                            color="bg-indigo-500"
                        />
                        <StatCard
                            title="Avg. Utilization"
                            value="85.3%"
                            change="+4.7%"
                            icon={TrendingUp}
                            trend="up"
                            color="bg-yellow-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exams by Room</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={examsByRoom}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="room" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar dataKey="exams" fill="#16a34a" name="Exams Written" />
                                    <Bar dataKey="capacity" fill="#e5e7eb" name="Room Capacity" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Completion by Time</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={examTimeData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="time" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="completedExams"
                                        stroke="#16a34a"
                                        fill="#16a34a"
                                        fillOpacity={0.6}
                                        name="Completed Exams"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Room Utilization Cards */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Utilization Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {examsByRoom.map((room, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900">{room.room}</h4>
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Exams:</span>
                                            <span className="font-medium">{room.exams}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Capacity:</span>
                                            <span className="font-medium">{room.capacity}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Utilization:</span>
                                            <span className={`font-medium ${room.utilization >= 90 ? 'text-green-600' :
                                                    room.utilization >= 75 ? 'text-yellow-600' : 'text-red-600'
                                                }`}>
                                                {room.utilization}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all duration-300 ${room.utilization >= 90 ? 'bg-green-500' :
                                                        room.utilization >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${room.utilization}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;