"use client"

import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      department: "Engineering",
      bio: "Sarah leads our technology vision with over 15 years of experience in software architecture and team leadership. She specializes in scalable systems and has a passion for mentoring emerging developers.",
      github: "https://github.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson"
    },
    {
      name: "Michael Chen",
      role: "Lead Product Designer",
      department: "Design",
      bio: "Michael brings creative excellence to our product experience. With a background in both visual design and user research, he ensures our products are both beautiful and intuitive.",
      github: "https://github.com/michaelchen",
      linkedin: "https://linkedin.com/in/michaelchen",
      twitter: "https://twitter.com/michaelchen"
    },
    {
      name: "Emily Rodriguez",
      role: "Senior Full Stack Developer",
      department: "Engineering",
      bio: "Emily is our go-to expert for complex technical challenges. She excels at building robust, scalable applications and has a keen eye for performance optimization and code quality.",
      github: "https://github.com/emilyrodriguez",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      twitter: "https://twitter.com/emilyrodriguez"
    },
    {
      name: "David Kim",
      role: "Data Science Lead",
      department: "Analytics",
      bio: "David transforms complex data into actionable insights. With expertise in machine learning and statistical analysis, he drives our data-driven decision making processes.",
      github: "https://github.com/davidkim",
      linkedin: "https://linkedin.com/in/davidkim",
      twitter: "https://twitter.com/davidkim"
    }
  ];

  return (
    <div className="min-h-screen bg-white mt-10">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center py-24 opacity-0 animate-fade-in-up">
          <h1 className="text-5xl font-bold text-green-600 mb-4 relative">
            The Brains Behind Detector
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-green-600 to-yellow-600 rounded-full"></span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
            Dedicated professionals driving innovation and excellence in everything we do
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-24">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className={`team-card bg-white rounded-2xl border border-slate-100 p-10 hover:shadow-xl hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden animate-fade-in-up delay-${(index + 1) * 100}`}
            >
              {/* Member Photo */}
              <div className="w-28 h-28 rounded-full mx-auto mb-6 bg-slate-50 flex items-center justify-center text-4xl text-slate-400 relative overflow-hidden transition-transform duration-300 border-2 border-slate-100 hover:scale-105 member-photo">
                👤
              </div>

              {/* Member Info */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-1">
                  {member.role}
                </p>
                <p className="text-sm text-slate-500">
                  {member.department}
                </p>
              </div>

              {/* Bio */}
              <p className="text-slate-600 text-sm leading-relaxed mb-8 text-left">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-4">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-800 hover:text-white hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  <Github size={20} />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 hover:bg-yellow-600 hover:text-white hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;