import { Calendar, ChevronDown, Download } from "lucide-react";
import React, { useState } from "react";

const AnalyticsTopBar = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: any;
  setSelectedDate: any;
}) => {
  const [dateRange, setDateRange] = useState("7"); // days
  const [showDateRangeDropdown, setShowDateRangeDropdown] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const dateRangeOptions = [
    { value: "1", label: "Last 24 Hours" },
    { value: "7", label: "Last 7 Days" },
    { value: "30", label: "Last 30 Days" },
    { value: "90", label: "Last 90 Days" },
  ];

  const handleExportReport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create and download a sample report
    const reportData = {
      date: selectedDate,
      userAnalytics: {
        totalActiveUsers: 68,
        newUsers: 89,
        totalLogins: 1558,
      },
      detectionAnalytics: {
        totalDetections: 214,
        trueDetections: 174,
        falseDetections: 40,
        accuracy: 81.3,
      },
      examAnalytics: {
        totalExams: 227,
        totalRooms: 7,
        averageUtilization: 85.3,
      },
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-report-${selectedDate}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setIsExporting(false);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6 h-[100px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Monitor system performance and user activity
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowDateRangeDropdown(!showDateRangeDropdown)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span className="font-medium text-gray-700">
                {
                  dateRangeOptions.find((option) => option.value === dateRange)
                    ?.label
                }
              </span>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
            </button>

            {showDateRangeDropdown && (
              <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg right-0">
                {dateRangeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setDateRange(option.value);
                      setShowDateRangeDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                      dateRange === option.value
                        ? "bg-green-50 text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />

          <button
            onClick={handleExportReport}
            disabled={isExporting}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download className="w-5 h-5 mr-2" />
            )}
            {isExporting ? "Exporting..." : "Export Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTopBar;
