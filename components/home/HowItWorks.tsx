import React from 'react'

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        How <span className="text-green-600">Detector</span> Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Simple setup, powerful protection for your academic assessments
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                            1
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Setup & Configure</h3>
                        <p className="text-gray-600">Easy integration with your existing exam platform. Configure detection parameters and privacy settings.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                            2
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Monitor in Real-time</h3>
                        <p className="text-gray-600">AI continuously analyzes student behavior, eye movements, and environmental factors during exams.</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                            3
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Review & Act</h3>
                        <p className="text-gray-600">Receive detailed reports and alerts, allowing educators to maintain academic integrity effectively.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks