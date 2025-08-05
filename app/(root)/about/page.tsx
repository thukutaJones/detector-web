"use client"

import React from 'react';
import { Eye, Shield, Users, Zap, Target, Award, Brain, Monitor } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Advanced Computer Vision",
      description: "State-of-the-art AI algorithms that analyze student behavior patterns and detect suspicious activities in real-time during examinations."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Built with enterprise-grade security measures to ensure data privacy and system integrity while maintaining 99.9% uptime reliability."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning",
      description: "Continuously learning system that adapts to new cheating patterns and improves detection accuracy over time."
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Live monitoring dashboard that provides instant alerts and detailed analytics for proctors and administrators."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Monitored", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Detection Accuracy", icon: <Target className="w-6 h-6" /> },
    { number: "500+", label: "Exams Conducted", icon: <Award className="w-6 h-6" /> },
    { number: "24/7", label: "System Availability", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-white">
     
      
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Section */}
        <div className="py-24">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h1 className="text-5xl font-bold text-green-600 mb-4 relative">
              About Detector
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-600 to-yellow-600 rounded-full"></span>
            </h1>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
              Revolutionizing academic integrity through cutting-edge computer vision technology
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Left Column - Text Content */}
            <div className="opacity- animate-slide-in-left delay-200">
              <h2 className="text-4xl font-bold text-slate-800 mb-6">
                Pioneering Academic Integrity
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Detector is an innovative exam cheating detection system developed by the brilliant minds at 
                <span className="font-semibold text-green-600"> Mzuzu University</span>. Our mission is to preserve 
                the sanctity of academic assessment through advanced computer vision technology.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                By leveraging state-of-the-art artificial intelligence and machine learning algorithms, we provide 
                educational institutions with a powerful tool to maintain examination integrity while ensuring a 
                fair and secure testing environment for all students.
              </p>
              
              {/* University Badge */}
              <div className="inline-flex items-center bg-green-50 px-6 py-3 rounded-full border border-green-200">
                <Award className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-800 font-medium">Proudly developed by Mzuzu University</span>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="opacity- animate-slide-in-right delay-400">
              <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl p-12 text-center border border-green-100">
                <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Eye className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Computer Vision Excellence</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our advanced AI continuously monitors and analyzes student behavior patterns, 
                  ensuring examination integrity with precision and reliability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up delay-300">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Cutting-Edge Features
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Discover how our advanced technology stack ensures comprehensive exam monitoring and detection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`feature-card bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-xl hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden gradient-border animate-fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up delay-200">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Our system has been tested and proven effective across multiple academic institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`stat-card bg-white rounded-2xl border border-slate-100 p-8 text-center hover:shadow-xl hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16">
          <div className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-3xl p-12 text-center text-white opacity-0 animate-fade-in-up delay-400">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto opacity-95">
              To empower educational institutions with intelligent, reliable, and ethical examination monitoring solutions 
              that uphold academic integrity while fostering a culture of trust and fairness in academic assessment. 
              We believe that every student deserves a fair opportunity to demonstrate their knowledge and skills in a 
              secure testing environment.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 text-center">
          <div className="opacity-0 animate-fade-in-up delay-500">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Ready to Transform Your Examinations?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join the growing number of institutions that trust Detector to maintain academic integrity
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;