import React from 'react';
import { features } from '@/constants/homeConstants';

const FeaturesSection = () => {
    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Comprehensive <span className="text-green-600">Detection</span> Capabilities
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our advanced AI system monitors multiple indicators to ensure complete exam integrity.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                                    <Icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
