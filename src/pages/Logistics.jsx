import React, { useState } from 'react';
import { Truck, MapPin, Navigation, AlertTriangle, CloudRain, CheckCircle, Clock, Zap } from 'lucide-react';

const SHIPMENTS = [
  { 
    id: "TRK-992-FX", 
    carrier: "FedEx Freight", 
    origin: "Memphis, TN", 
    destination: "Chicago, IL", 
    status: "rerouted", 
    eta: "Tomorrow, 14:00",
    alert: "Severe snowstorm detected on original Route I-55N.",
    aiAction: "Agent rerouted via I-57N. Saved 14 hours of delay."
  },
  { 
    id: "TRK-405-UP", 
    carrier: "UPS LTL", 
    origin: "Dallas, TX", 
    destination: "Chicago, IL", 
    status: "on-time", 
    eta: "Thursday, 09:00",
    alert: null,
    aiAction: "Monitoring nominal parameters. No intervention needed."
  }
];

export default function Logistics() {
  const [activeShipment, setActiveShipment] = useState(SHIPMENTS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] animate-fade-in-up">
      
      {/* Shipment List */}
      <div className="bg-cmd-surface rounded-xl p-6 border border-gray-800/50 shadow-2xl flex flex-col h-full overflow-y-auto">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-cmd-text-primary">
          <Truck className="w-5 h-5 text-cmd-success" />
          Active In-Transit
        </h2>
        
        <div className="space-y-4">
          {SHIPMENTS.map(shipment => (
            <div 
              key={shipment.id} 
              onClick={() => setActiveShipment(shipment)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${activeShipment.id === shipment.id ? 'bg-cmd-bg border-cmd-success/50' : 'bg-cmd-bg/50 border-gray-800 hover:border-gray-600'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold">{shipment.id}</span>
                {shipment.status === 'rerouted' && <AlertTriangle className="w-4 h-4 text-cmd-warning" />}
                {shipment.status === 'on-time' && <CheckCircle className="w-4 h-4 text-cmd-success" />}
              </div>
              <div className="text-sm text-cmd-text-secondary mb-2">{shipment.carrier}</div>
              <div className="flex items-center gap-2 text-xs text-cmd-text-secondary">
                <Clock className="w-3 h-3" /> ETA: <span className="text-cmd-text-primary">{shipment.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail & Map View */}
      <div className="lg:col-span-2 bg-cmd-surface rounded-xl p-6 border border-gray-800/50 shadow-2xl flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Live AI Telemetry</h2>
          <span className="bg-cmd-success/20 text-cmd-success px-3 py-1 rounded-full text-xs font-bold border border-cmd-success/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cmd-success animate-pulse"></span> Live Tracking
          </span>
        </div>

        {/* Abstract Map Area */}
        <div className="flex-1 bg-cmd-bg rounded-lg border border-gray-800 relative overflow-hidden mb-6 group">
          {/* Grid lines to simulate radar/map */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          
          {/* Origin Point */}
          <div className="absolute top-3/4 left-1/4 flex flex-col items-center">
            <div className="w-4 h-4 bg-gray-500 rounded-full border-2 border-cmd-bg z-10"></div>
            <span className="text-xs mt-1 text-cmd-text-secondary bg-cmd-bg/80 px-1">{activeShipment.origin}</span>
          </div>

          {/* Destination Point */}
          <div className="absolute top-1/4 left-3/4 flex flex-col items-center">
            <div className="w-4 h-4 bg-cmd-success rounded-full border-2 border-cmd-bg z-10"></div>
            <span className="text-xs mt-1 text-cmd-text-secondary bg-cmd-bg/80 px-1">{activeShipment.destination}</span>
            <div className="absolute w-12 h-12 bg-cmd-success/20 rounded-full animate-ping z-0"></div>
          </div>

          {/* Abstract Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {activeShipment.status === 'rerouted' && (
              <>
                <path d="M 25% 75% Q 30% 30% 75% 25%" fill="none" stroke="rgba(239, 68, 68, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
                <circle cx="45%" cy="40%" r="20" fill="rgba(239, 68, 68, 0.1)" />
                <text x="45%" y="40%" fill="#ef4444" fontSize="12" textAnchor="middle" dy=".3em">⛈️</text>
              </>
            )}
            <path 
              d={activeShipment.status === 'rerouted' ? "M 25% 75% Q 60% 80% 75% 25%" : "M 25% 75% Q 40% 40% 75% 25%"} 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="3" 
            />
            {/* Truck blip */}
            <circle cx={activeShipment.status === 'rerouted' ? "60%" : "50%"} cy={activeShipment.status === 'rerouted' ? "60%" : "50%"} r="4" fill="#ffffff" />
          </svg>
        </div>

        {/* AI Analysis Panel */}
        <div className="bg-cmd-bg border border-gray-800 rounded-lg p-5">
          <h3 className="text-sm text-cmd-text-secondary mb-3 flex items-center gap-2">
            <Navigation className="w-4 h-4" /> Agent Navigation Log
          </h3>
          
          {activeShipment.status === 'rerouted' ? (
            <div className="space-y-3">
              <div className="flex gap-3 text-sm">
                <CloudRain className="w-5 h-5 text-cmd-danger shrink-0" />
                <div>
                  <span className="text-cmd-danger font-bold">Threat Detected: </span>
                  <span className="text-cmd-text-primary">{activeShipment.alert}</span>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <Zap className="w-5 h-5 text-cmd-warning shrink-0" />
                <div>
                  <span className="text-cmd-warning font-bold">Agent Action: </span>
                  <span className="text-cmd-text-primary">{activeShipment.aiAction}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-cmd-success shrink-0" />
              <div>
                <span className="text-cmd-success font-bold">Status Normal: </span>
                <span className="text-cmd-text-primary">{activeShipment.aiAction}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
