/**
 * Generates a line chart URL using the QuickChart.io API.
 * @param {any} data - Array of data points for the chart.
 * @returns {string} The URL of the generated chart image.
 */
const generateLineChartUrl = (data: any = []): string => {
  const chartConfig = {
    type: "line",
    data: {
      labels: data.map((d: any) => `Week ${d.week}`),
      datasets: [
        {
          label: "Verified Incidents",
          data: data.map((d: any) => d.verified),
          borderColor: "#16a34a",
          backgroundColor: "rgba(22, 163, 74, 0.1)",
          fill: true,
          tension: 0.4,
        },
        {
          label: "False Positives",
          data: data.map((d: any) => d.falsePositives),
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top", labels: { color: "#4b5563", font: { size: 14 } } },
      },
      scales: {
        x: { ticks: { color: "#6b7280" } },
        y: { ticks: { color: "#6b7280" } },
      },
    },
  };
  const encodedConfig = encodeURIComponent(JSON.stringify(chartConfig));
  return `https://quickchart.io/chart?c=${encodedConfig}&width=600&height=350&backgroundColor=white&format=png`;
};

/**
 * Generates a doughnut chart URL for alert distribution.
 * @param {any} verified - Count of verified violations.
 * @param {any} falsePositives - Count of false positives.
 * @param {any} pending - Count of alerts pending review.
 * @returns {string} The URL of the generated chart image.
 */
const generatePieChartUrl = (verified: any = 0, falsePositives: any = 0, pending: any = 0): string => {
  const total = verified + falsePositives + pending;
  const chartConfig = {
    type: "doughnut",
    data: {
      labels: ["Verified Violations", "False Positives", "Pending Review"],
      datasets: [
        {
          data: [verified, falsePositives, pending],
          backgroundColor: ["#16a34a", "#ef4444", "#f59e0b"],
          borderColor: "#ffffff",
          borderWidth: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        doughnutlabel: {
          labels: [
            { text: `${total}`, font: { size: 24, weight: "bold", family: "Inter" }, color: '#1f2937' },
            { text: "Total Alerts", font: { size: 14, family: "Inter" }, color: '#6b7280' },
          ],
        },
      },
    },
  };
  const encodedConfig = encodeURIComponent(JSON.stringify(chartConfig));
  return `https://quickchart.io/chart?c=${encodedConfig}&width=600&height=350&backgroundColor=white&format=png`;
};

/**
 * Generates the full HTML for the analytics report.
 * @param {any} analytics - The analytics data object.
 * @param {any} allAlerts - An array of all alert objects.
 * @returns {string} The complete HTML report string.
 */
const generateAnalyticsReport = (analytics: any, allAlerts: any = []): string => {
  // --- 1. Validate and Destructure Data ---
  if (!analytics) {
    throw new Error("Analytics data object is required to generate a report.");
  }
  const {
    detectionAccuracy, totalAlerts, cheatingDetected, normalBehavior, pendingReview, weeklyTrend = [],
    accuracyTrend = { direction: 'none', text: 'N/A' }, alertsTrend = { direction: 'none', text: 'N/A' },
    incidentsTrend = { direction: 'none', text: 'N/A' }, fpRateTrend = { direction: 'none', text: 'N/A' },
  } = analytics;

  // --- 2. Calculate Derived Metrics ---
  const falsePositiveRate = totalAlerts > 0 ? ((normalBehavior / totalAlerts) * 100).toFixed(1) : "0.0";
  const cheatingPercentage = totalAlerts > 0 ? ((cheatingDetected / totalAlerts) * 100).toFixed(1) : "0.0";
  const normalPercentage = totalAlerts > 0 ? ((normalBehavior / totalAlerts) * 100).toFixed(1) : "0.0";
  const pendingPercentage = totalAlerts > 0 ? ((pendingReview / totalAlerts) * 100).toFixed(1) : "0.0";
  const getTrendIcon = (direction: any) => (direction === 'up' ? '↗' : direction === 'down' ? '↘' : '');

  // --- 3. Generate Dynamic Content ---
  const today = new Date();
  const generatedDate = today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const generatedTime = today.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
  const reportId = Math.random().toString(36).substr(2, 9).toUpperCase();
  const lineChartUrl = generateLineChartUrl(weeklyTrend);
  const pieChartUrl = generatePieChartUrl(cheatingDetected, normalBehavior, pendingReview);

  const weeklyTrendRows = weeklyTrend.map((d: any) => `
    <tr>
      <td>Week ${d.week || 'N/A'}</td><td>${d.verified || 'N/A'}</td>
      <td>${d.falsePositives || 'N/A'}</td><td>${d.accuracy || 'N/A'}%</td>
    </tr>`).join('');

  // --- 4. Generate All Alerts Table Rows ---
  const alertRows = allAlerts.map((alert: any) => {
    const createdDate = new Date(alert.created);
    const date = createdDate.toLocaleDateString('en-CA'); // YYYY-MM-DD
    const time = createdDate.toLocaleTimeString('en-GB'); // HH:MM:SS
    const statusText = (alert.status || 'N/A').replace(/_/g, ' ');
    const decisionText = alert.decision || 'N/A';
    return `
      <tr>
        <td>${date}</td>
        <td>${time}</td>
        <td>${alert.method || 'N/A'}</td>
        <td><span class="status ${alert.status || ''}">${statusText}</span></td>
        <td>${decisionText}</td>
        <td>${alert.room || 'N/A'}</td>
      </tr>`;
  }).join('');


  // --- 5. Return Full HTML Template ---
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Detection Analytics Report</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            :root { --gray-100: #f3f4f6; --gray-200: #e5e7eb; --gray-500: #6b7280; --gray-600: #4b5563; --gray-800: #1f2937; --green: #16a34a; --white: #ffffff; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; background: var(--gray-100); color: var(--gray-800); line-height: 1.6; }
            .container { max-width: 1200px; background: var(--white); box-shadow: 0 10px 30px rgba(0,0,0,0.05); overflow: hidden; }
            .header { background: var(--green); color: var(--white); padding: 50px 60px; position: relative; }
            .header-content { position: relative; z-index: 2; }
            .header h1 { font-size: 30px; font-weight: 800; margin-bottom: 2px; }
            .header .subtitle { font-size: 12px; opacity: 0.9; }
            .header .meta { position: absolute; top: 50px; right: 60px; text-align: right; font-size: 14px; z-index: 3; }
            .content { padding: 40px 60px; }
            .section { margin-bottom: 60px; page-break-inside: avoid; }
            .section-header { display: flex; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--gray-200); }
            .section-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 24px; background: var(--green); box-shadow: 0 6px 20px rgba(22, 163, 74, 0.25); color: var(--white); }
            .section-title { font-size: 32px; font-weight: 700; }
            .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
            .summary-card { background: var(--gray-800); color: var(--white); padding: 30px; border-radius: 16px; }
            .summary-card.accent { background: var(--green); }
            .summary-card h4 { font-size: 14px; margin-bottom: 12px; opacity: 0.8; font-weight: 600; text-transform: uppercase; }
            .summary-card .big-number { font-size: 48px; font-weight: 800; }
            .summary-card .change { font-size: 14px; opacity: 0.85; }
            .two-column { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 40px; margin-top: 40px; }
            .chart-container { border: 1px solid var(--gray-200); border-radius: 16px; padding: 30px; }
            .chart-title { font-size: 22px; font-weight: 700; margin-bottom: 25px; }
            .data-table { width: 100%; border-collapse: collapse; margin-top: 25px; border-radius: 12px; overflow: hidden; border: 1px solid var(--gray-200); }
            .data-table th, .data-table td { padding: 16px; text-align: left; border-bottom: 1px solid var(--gray-200); }
            .data-table th { background: #f9fafb; color: var(--gray-600); font-size: 13px; text-transform: uppercase; }
            .data-table tr:last-child td { border-bottom: none; }
            .status { padding: 4px 10px; border-radius: 12px; font-weight: 600; font-size: 12px; text-transform: capitalize; }
            .status.not_reviewed { background-color: rgba(245, 158, 11, 0.1); color: #b45309; }
            .status.cheating, .status.violation { background-color: rgba(239, 68, 68, 0.1); color: #b91c1c; }
            .status.normal { background-color: rgba(22, 163, 74, 0.1); color: #14532d; }
            .footer { background: var(--gray-800); color: var(--white); padding: 50px 60px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="header-content">
                    <img src="https://raw.githubusercontent.com/thukutaJones/detector-public-assets/main/logos/detectorGreen.png" alt="Detector Logo" style="height: 200px;">
                    <h1>Detection Analytics Report</h1>
                    <div class="subtitle">Comprehensive Exam Integrity Monitoring</div>
                </div>
                <div class="meta">
                    <div><strong>Generated:</strong> ${generatedDate}</div>
                    <div><strong>Time:</strong> ${generatedTime}</div>
                </div>
            </div>

            <div class="content">
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h9.75a2.25 2.25 0 012.25 2.25zm-3-3l-3 3m0 0l-3-3m3 3V1.5" /></svg></div>
                        <h2 class="section-title">Executive Summary</h2>
                    </div>
                    <div class="summary-grid">
                        <div class="summary-card accent"><h4>Detection Accuracy</h4><div class="big-number">${detectionAccuracy || 'N/A'}%</div></div>
                        <div class="summary-card accent"><h4>Total Alerts</h4><div class="big-number">${totalAlerts || 'N/A'}</div></div>
                        <div class="summary-card accent"><h4>Verified Incidents</h4><div class="big-number">${cheatingDetected || 'N/A'}</div></div>
                        <div class="summary-card accent"><h4>False Positive Rate</h4><div class="big-number">${falsePositiveRate || 'N/A'}%</div></div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header">
                        <div class="section-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12M3.75 3h16.5M3.75 12h16.5m0 0v1.125c0 .621-.504 1.125-1.125 1.125H9.75" /></svg></div>
                        <h2 class="section-title">Detection Performance</h2>
                    </div>
                    <div class="two-column">
                        <div class="chart-container"><div class="chart-title">Alerts Distribution</div><img src="${pieChartUrl}" alt="Pie chart of alert distribution." style="width: 100%;"/></div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg></div>
                        <h2 class="section-title">All Recorded Alerts</h2>
                    </div>
                    <table class="data-table">
                        <thead>
                            <tr><th>Date</th><th>Time</th><th>Method</th><th>Status</th><th>Decision</th><th>Room</th></tr>
                        </thead>
                        <tbody>
                            ${alertRows.length > 0 ? alertRows : '<tr><td colspan="6" style="text-align: center;">No alerts recorded for this period.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </body>
    </html>`;
};


/**
 * Main template handler function.
 * @param {any} analytics - Data for the report.
 * @param {any} allAlerts - An array of all alert objects.
 * @param {any} type - The type of template to generate.
 * @returns {Promise<string>} A promise that resolves to the HTML string.
 */
const Templates = async (analytics: any, allAlerts: any, type: any): Promise<string> => {
  try {
    switch (type) {
      case "analytics":
        // The unused 'users' parameter is removed for clarity.
        return generateAnalyticsReport(analytics, allAlerts);
      default:
        throw new Error(`Template type "${type}" is not supported.`);
    }
  } catch (error: any) {
    console.log("Error generating template:", error);
    throw error;
  }
};

export default Templates;