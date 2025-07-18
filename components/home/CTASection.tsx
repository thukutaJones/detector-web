import React from 'react'

const CTASection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                    Ready to Enhance Your Academic Integrity?
                </h2>
                <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                    Join leading universities worldwide in maintaining the highest standards of academic honesty with Detector's advanced monitoring system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg shadow-lg">
                        Schedule Demo
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-green-600 transition-colors font-medium text-lg">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CTASection