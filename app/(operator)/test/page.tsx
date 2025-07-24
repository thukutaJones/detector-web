'use client';

import { useEffect, useState } from 'react';

export default function AlertSocket() {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8001/ws");

    socket.onmessage = (event) => {
      setAlerts((prev) => [...prev, event.data]);
      console.log("New alert received:", event.data);
    };

    return () => socket.close();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Real-Time Alerts</h2>
      <ul className="space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="bg-red-100 p-2 rounded text-red-800">
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
}
