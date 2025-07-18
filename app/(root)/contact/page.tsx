"use client"

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Building, Globe, ArrowRight, Zap, Shield, Heart } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<any>(null);

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "hello@company.com",
      secondary: "We'll respond within 24 hours",
      description: "Get in touch for general inquiries or support",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: "+1 (555) 123-4567",
      secondary: "Mon-Fri, 9AM-6PM EST",
      description: "Speak directly with our team",
      color: "green"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "123 Business Avenue",
      secondary: "New York, NY 10001",
      description: "Our headquarters in Manhattan",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Business Hours",
      primary: "Monday - Friday",
      secondary: "9:00 AM - 6:00 PM EST",
      description: "We're here when you need us",
      color: "orange"
    }
  ];

  const officeLocations = [
    {
      city: "New York",
      address: "123 Business Avenue, NY 10001",
      phone: "+1 (555) 123-4567",
      isHQ: true
    },
    {
      city: "San Francisco",
      address: "456 Tech Street, CA 94105",
      phone: "+1 (555) 234-5678",
      isHQ: false
    },
    {
      city: "London",
      address: "789 Innovation Lane, EC2A 4BX",
      phone: "+44 20 7123 4567",
      isHQ: false
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Response",
      description: "Average response time under 2 hours"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your information is always protected"
    },
    {
      icon: Heart,
      title: "Dedicated Support",
      description: "Personal attention to every inquiry"
    }
  ];

  const ContactCard = ({ info, index }: { info: any; index: any; }) => (
    <div
      className="group relative bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10">
        <div className="flex items-start space-x-5">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
            <info.icon className="w-7 h-7 text-green-600 transition-colors duration-300" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">{info.title}</h3>
            <p className="text-gray-900 font-semibold mb-1">{info.primary}</p>
            <p className="text-green-600 text-sm font-medium mb-3">{info.secondary}</p>
            <p className="text-gray-500 text-sm leading-relaxed">{info.description}</p>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-green-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white mt-10">
      {/* Header Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="text-center py-24 opacity-0 animate-fade-in-up">
              <h1 className="text-5xl font-bold text-green-600 mb-4 relative">
                Get in Touch
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-600 to-yellow-600 rounded-full"></span>
              </h1>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>


            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-green-100 to-green-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full blur-2xl opacity-80"></div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <ContactCard key={index} info={info} index={index} />
          ))}
        </div>

        {/* Main Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 p-10 shadow-lg shadow-gray-100/50">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mr-4">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-white ${focusedField === 'name'
                        ? 'border-green-400 ring-4 ring-green-100 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-white ${focusedField === 'email'
                        ? 'border-green-400 ring-4 ring-green-100 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-white ${focusedField === 'company'
                        ? 'border-green-400 ring-4 ring-green-100 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-white ${focusedField === 'subject'
                        ? 'border-green-400 ring-4 ring-green-100 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      placeholder="What's this about?"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className={`w-full px-5 py-4 border rounded-xl transition-all duration-300 bg-white resize-none ${focusedField === 'message'
                      ? 'border-green-400 ring-4 ring-green-100 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-gray-500">
                    * Required fields
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center px-10 py-4 border border-transparent text-base font-semibold rounded-xl text-white transition-all duration-300 ${isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 hover:shadow-xl hover:shadow-green-200 hover:scale-105'
                      }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-3" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl flex items-center animate-pulse">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-4" />
                  <div>
                    <p className="text-green-800 font-semibold">Thank you for reaching out!</p>
                    <p className="text-green-700 text-sm">Your message has been sent successfully. We'll get back to you soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Office Locations */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-lg shadow-gray-100/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Building className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Our Locations</h2>
              </div>

              <div className="space-y-6">
                {officeLocations.map((location, index) => (
                  <div key={index} className="group p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{location.city}</h3>
                      {location.isHQ && (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{location.address}</p>
                    <p className="text-gray-500 text-sm">{location.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-lg shadow-gray-100/50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Quick Links</h2>
              </div>

              <div className="space-y-2">
                {[
                  { label: "Support Center", href: "#" },
                  { label: "Documentation", href: "#" },
                  { label: "API Reference", href: "#" },
                  { label: "Status Page", href: "#" },
                  { label: "Privacy Policy", href: "#" }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <span className="text-gray-700 group-hover:text-green-600 transition-colors duration-200 font-medium">
                      {link.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Can't find what you're looking for? Check out our comprehensive FAQ section.
          </p>
          <button className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105">
            View FAQ
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;