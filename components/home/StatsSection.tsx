import { stats } from '@/constants/homeConstants';
import React, { useEffect, useState } from 'react'

const StatsSection = () => {
    const [currentStat, setCurrentStat] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);
    return (
        <section className="py-16 bg-green-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`text-center transform transition-all duration-500 ${currentStat === index ? 'scale-110' : 'scale-100'
                                    }`}
                            >
                                <div className="flex justify-center mb-4">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-green-100 font-medium">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default StatsSection