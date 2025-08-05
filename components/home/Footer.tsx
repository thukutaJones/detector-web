import { Eye } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-green-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src={"/logo.png"}
                width={200}
                height={200}
                alt="logo"
                className="h-14 w-14"
              />
              <span className="text-2xl font-bold">Detector</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Protecting academic integrity through advanced computer vision
              technology and AI-powered detection systems.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integration
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-gray-200 mt-8 pt-8 text-center text-gray-700">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Detector. All rights reserved.
          </p>
          <img
            src="/ictMzuni.png"
            alt="Mzuzu University Logo"
            className="absolute right-4 top-4 h-10 w-10 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
