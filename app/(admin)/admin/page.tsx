"use client"

import {
    Users,
    AlertTriangle,
    Clock,
    Target,
} from 'lucide-react';
import DashboardTopBar from '@/components/admin/dashboard/DashboardTopBar';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import ContentGrid from '@/components/admin/dashboard/ContentGrid';
import AdvancedPerformanceChart from '@/components/admin/dashboard/AdvancedPerformanceChart';

const Dashboard = () => {
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
        <div className="flex-1 flex flex-col h-screen">
            <DashboardTopBar />
            <main className="flex-1 overflow-auto bg-transparent">
                <div className="p-8 space-y-8">
                    <StatsGrid stats={stats} />
                    <ContentGrid recentActivity={recentActivity} liveMetrics={liveMetrics} />
                    <AdvancedPerformanceChart />s
                </div>
            </main>
        </div>
    );
};

export default Dashboard;