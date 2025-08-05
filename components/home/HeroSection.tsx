import { Award, Eye, Monitor, Shield } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="pt-10 md:pt-24 h-[calc(100vh-70px)] border pb-16 bg-gradient-to-b from-white via-green-white to-green-50 flex flex-col md:items-center md:justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animated fadeInUp">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-green-50 px-6 py-3 rounded-full border border-green-200">
                <Award className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-green-800 text-sm font-medium">
                  Proudly developed by Mzuzu University
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Safeguarding <span className="text-green-600">Academic</span>{" "}
                Integrity
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Advanced computer vision technology that detects exam cheating
                in real-time, ensuring fair assessment and maintaining
                educational standards across your institution.
              </p>
            </div>

            <div className="flex flex-col w-full justify-end sm:flex-row gap-4">
              <button
                className="bg-green-600 text-white px-20 py-3 rounded-full hover:bg-green-700 transition-all transform hover:scale-105 font-medium text-lg shadow-lg"
                onClick={() => (location.href = "/sign-in")}
              >
                <p className="text-white">Sign In</p>
              </button>
            </div>
          </div>

          <div className="hidden relative md:flex justify-center items-center">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-green-600 rounded-full opacity-10 animate-ping"></div>
            <img
              src="/bg.jpg"
              alt="AI cheating detection"
              className="w-full animated fadeInRight z-20 max-w-md lg:max-w-lg rounded-3xl shadow-2xl border-4 border-white object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
