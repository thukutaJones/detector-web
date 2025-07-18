import { Award, Eye, Monitor, Shield } from 'lucide-react'
import React from 'react'

const HeroSection = () => {
    return (
        <section className="pt-24 min-h-screen pb-16 bg-gradient-to-br from-white via-green-50 to-yellow-50 flex flex-col items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="inline-flex items-center bg-green-50 px-6 py-3 rounded-full border border-green-200">
                                <Award className="w-5 h-5 text-green-600 mr-3" />
                                <span className="text-green-800 text-sm font-medium">Proudly developed by Mzuzu University</span>
                            </div>

                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Safeguard <span className="text-green-600">Academic</span> Integrity
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed">
                                Advanced computer vision technology that detects exam cheating in real-time, ensuring fair assessment and maintaining educational standards across your institution.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 font-medium text-lg shadow-lg" onClick={() => location.href = "/sign-in"}>
                                Sign In
                            </button>
                            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 transition-colors font-medium text-lg" onClick={() => location.href = "/sign-up"}>
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">Live Monitoring</h3>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-green-600 font-medium">Active</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Eye className="w-5 h-5 text-green-600" />
                                            <span className="text-sm font-medium text-gray-900">Eye Tracking</span>
                                        </div>
                                        <div className="text-2xl font-bold text-green-600">Normal</div>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Monitor className="w-5 h-5 text-yellow-600" />
                                            <span className="text-sm font-medium text-gray-900">Screen Focus</span>
                                        </div>
                                        <div className="text-2xl font-bold text-yellow-600">Secure</div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-900">Detection Confidence</span>
                                        <span className="text-sm font-bold text-green-600">98.7%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-600 rounded-full opacity-10"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection