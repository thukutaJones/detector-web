import React from 'react';

const ManagementLoading = ({ 
  message = "Loading...", 
  subMessage = "Preparing your management interface",
  context = "general" // "users", "courses", "programs", "general"
}) => {
  const getContextConfig = () => {
    switch(context) {
      case 'users':
        return {
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5C15.3431 5 14 6.34315 14 8C14 9.65685 15.3431 11 17 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21V19C20.9993 18.1137 20.7044 17.2528 20.1614 16.5523C19.6184 15.8519 18.8581 15.3516 18 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          message: "Loading users...",
          sub: "Loading user positions and roles",
          indicators: ["User Roles", "Permissions", "Access Control"]
        };
      case 'courses':
        return {
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          message: "Loading courses...",
          sub: "Preparing course management tools",
          indicators: ["Course Content", "Schedules", "Dates added"]
        };
      case 'programs':
        return {
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          message: "Loading programs...",
          sub: "Organizing academic programs",
          indicators: ["Names", "Dates added", "Edit and Delete"]
        };
      default:
        return {
          icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          message: message,
          sub: subMessage,
          indicators: ["Data Loading", "Interface Prep", "Security Check"]
        };
    }
  };

  const config = getContextConfig();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Main Animation Container */}
      <div className="relative">
        {/* Outer Corporate Ring */}
        <div className="w-28 h-28 border-3 border-gray-100 rounded-lg animate-spin" style={{animationDuration: '3s'}}>
          <div className="absolute inset-0 border-3 border-transparent border-t-green-600 border-r-green-600 rounded-lg animate-spin" style={{animationDuration: '3s'}}></div>
        </div>
        
        {/* Inner Ring */}
        <div className="absolute inset-2 w-24 h-24 border-2 border-gray-50 rounded-lg animate-spin" style={{animationDirection: 'reverse', animationDuration: '2s'}}>
          <div className="absolute inset-0 border-2 border-transparent border-l-yellow-600 border-b-yellow-600 rounded-lg animate-spin" style={{animationDirection: 'reverse', animationDuration: '2s'}}></div>
        </div>
        
        {/* Central Hub */}
        <div className="absolute inset-4 w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
          {/* Management Icon */}
          <div className="relative animate-pulse">
            {config.icon}
            {/* Data Flow Animation */}
            <div className="absolute -inset-3">
              <div className="absolute top-0 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
              <div className="absolute right-0 top-1/2 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              <div className="absolute left-0 top-1/2 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
            </div>
          </div>
        </div>
        
        {/* Corner Accent Elements */}
        <div className="absolute -inset-6">
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-green-600 opacity-60 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-yellow-600 opacity-60 animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-yellow-600 opacity-60 animate-pulse" style={{animationDelay: '0.6s'}}></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-green-600 opacity-60 animate-pulse" style={{animationDelay: '0.9s'}}></div>
        </div>
      </div>
      
      {/* Professional Progress Bar */}
      <div className="mt-10 w-80 bg-gray-100 rounded-sm h-1.5 overflow-hidden shadow-inner">
        <div className="h-full bg-gradient-to-r from-green-600 to-yellow-600 rounded-sm"
             style={{
               width: '100%',
               background: 'linear-gradient(90deg, #059669 0%, #059669 40%, #d97706 60%, #059669 100%)',
               backgroundSize: '250% 100%',
               animation: 'dashboardProgress 2.5s ease-in-out infinite'
             }}>
        </div>
      </div>
      
      {/* Corporate Text Content */}
      <div className="mt-8 text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">
          {config.message}
        </h2>
        <p className="text-gray-500 text-base font-medium">
          {config.sub}
        </p>
      </div>
      
      {/* Management Status Grid */}
      <div className="mt-10 grid grid-cols-3 gap-8">
        {config.indicators.map((indicator, index) => (
          <div key={indicator} className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: index % 2 === 0 ? '#059669' : '#d97706',
                  animationDelay: `${index * 0.4}s`
                }}
              ></div>
              <div 
                className="w-1 h-1 rounded-full animate-pulse opacity-60"
                style={{
                  backgroundColor: index % 2 === 0 ? '#059669' : '#d97706',
                  animationDelay: `${index * 0.4 + 0.2}s`
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 font-medium text-center">
              {indicator}
            </span>
          </div>
        ))}
      </div>
      
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #059669 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #d97706 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <style jsx>{`
        @keyframes dashboardProgress {
          0% { background-position: -250% 0; }
          100% { background-position: 250% 0; }
        }
      `}</style>
    </div>
  );
};

export default ManagementLoading;