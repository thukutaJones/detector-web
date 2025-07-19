import React from 'react';

const DetectorLoading = ({ 
  message = "Analyzing exam integrity...", 
  subMessage = "AI-powered detection in progress" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Main Animation Container */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-32 h-32 border-4 border-gray-100 rounded-full animate-spin">
          <div className="absolute inset-0 border-4 border-transparent border-t-green-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Middle Ring */}
        <div className="absolute inset-2 w-28 h-28 border-3 border-gray-50 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}>
          <div className="absolute inset-0 border-3 border-transparent border-r-yellow-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
        
        {/* Inner Core */}
        <div className="absolute inset-6 w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center animate-pulse">
          {/* Scanner Icon */}
          <div className="relative">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white animate-pulse">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {/* Scanning Line */}
            <div className="absolute -inset-2 border border-white/30 rounded-full animate-ping"></div>
          </div>
        </div>
        
        {/* Floating Dots */}
        <div className="absolute -inset-8">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-600 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/4 right-0 w-1.5 h-1.5 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute bottom-1/4 left-0 w-1.5 h-1.5 bg-yellow-600 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-12 w-64 bg-gray-100 rounded-full h-1 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-600 via-yellow-600 to-green-600 animate-pulse" 
             style={{
               width: '100%',
               background: 'linear-gradient(90deg, #059669 0%, #059669 33%, #d97706 50%, #059669 67%, #059669 100%)',
               backgroundSize: '200% 100%',
               animation: 'progressShine 2s ease-in-out infinite'
             }}>
        </div>
      </div>
      
      {/* Text Content */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 animate-pulse">
          {message}
        </h3>
        <p className="text-gray-500 text-sm animate-pulse" style={{animationDelay: '0.5s'}}>
          {subMessage}
        </p>
      </div>
      
      {/* Status Indicators */}
      <div className="mt-8 flex space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Camera Analysis</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <span className="text-sm text-gray-600">Audio Processing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
          <span className="text-sm text-gray-600">Behavior Detection</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes progressShine {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default DetectorLoading;