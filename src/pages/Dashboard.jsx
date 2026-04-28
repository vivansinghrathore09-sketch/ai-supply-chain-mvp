import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
  ShieldCheck, 
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';

const MOCK_INVENTORY = [
  { id: 1, name: "Thermal Rolls (500ct)", current: 120, baseline: 500, burnRate: "15/day", status: "warning", predictedStockout: "8 days" },
  { id: 2, name: "Bubble Wrap (200ft)", current: 45, baseline: 200, burnRate: "5/day", status: "danger", predictedStockout: "9 days" },
  { id: 3, name: "Corrugated Boxes (M)", current: 890, baseline: 1000, burnRate: "25/day", status: "safe", predictedStockout: "35 days" }
];

const MOCK_APPROVALS = [
  { id: "PO-4092", supplier: "Uline Inc.", amount: "$4,520.00", items: "Pallet Jack, Stretch Wrap", riskLevel: "High", time: "10 mins ago" },
  { id: "PO-4093", supplier: "Zebra Tech", amount: "$1,250.00", items: "Thermal Printers (x2)", riskLevel: "Medium", time: "1 hr ago" }
];

const MOCK_LOGS = [
  { id: 1, type: "negotiation", agent: "Negotiator-Alpha", target: "FedEx API", status: "Success", details: "Secured 15% discount on upcoming LTL freight.", time: "14:02:45" },
  { id: 2, type: "monitoring", agent: "Inventory-Bot", target: "Thermal Rolls", status: "Alert", details: "Burn rate spike detected. Preparing draft PO.", time: "13:45:10" },
  { id: 3, type: "negotiation", agent: "Negotiator-Beta", target: "Uline", status: "Pending", details: "Counter-offer placed for $4,520. Awaiting response.", time: "12:30:00" },
];

export default function Dashboard() {
  const [approvals, setApprovals] = useState(MOCK_APPROVALS);
  const [logs, setLogs] = useState(MOCK_LOGS);

  const handleApprove = (id) => {
    setApprovals(approvals.filter(a => a.id !== id));
    const newLog = {
      id: Date.now(),
      type: "approval",
      agent: "Human-in-Loop",
      target: id,
      status: "Approved",
      details: "Manual verification confirmed.",
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };
    setLogs([newLog, ...logs]);
  };

  const handleReject = (id) => {
    setApprovals(approvals.filter(a => a.id !== id));
    const newLog = {
      id: Date.now(),
      type: "rejection",
      agent: "Human-in-Loop",
      target: id,
      status: "Rejected",
      details: "Manual verification denied.",
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
      {/* Top/Left: Predictive Inventory (Spans 2 columns on large screens) */}
      <div className="lg:col-span-2 bg-cmd-surface rounded-xl p-6 border border-gray-800/50 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-cmd-warning" />
            Predictive Engine: Inventory
          </h2>
          <button className="text-xs bg-cmd-bg px-3 py-1 rounded text-cmd-text-secondary hover:text-cmd-text-primary transition-colors">
            View All Insights
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_INVENTORY.map(item => (
            <div key={item.id} className="bg-cmd-bg rounded-lg p-4 border border-gray-800 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  {item.status === 'warning' && <AlertTriangle className="w-4 h-4 text-cmd-warning" />}
                  {item.status === 'danger' && <XCircle className="w-4 h-4 text-cmd-danger" />}
                  {item.status === 'safe' && <CheckCircle className="w-4 h-4 text-cmd-success" />}
                </div>
                <div className="text-3xl font-bold mb-1">
                  {item.current} <span className="text-xs text-cmd-text-secondary font-normal">/ {item.baseline}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800/50 text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-cmd-text-secondary">Burn Rate:</span>
                  <span>{item.burnRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cmd-text-secondary">Stockout:</span>
                  <span className={`${item.status === 'danger' ? 'text-cmd-danger font-bold' : item.status === 'warning' ? 'text-cmd-warning' : 'text-cmd-success'}`}>
                    {item.predictedStockout}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top/Right: Human in the loop queue */}
      <div className="bg-cmd-surface rounded-xl p-6 border border-gray-800/50 shadow-2xl flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cmd-danger" />
            Approval Queue
          </h2>
          <span className="bg-cmd-danger/20 text-cmd-danger px-2 py-0.5 rounded text-xs font-bold">
            {approvals.length} Pending
          </span>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {approvals.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-cmd-text-secondary text-sm">
              <CheckCircle className="w-8 h-8 text-cmd-success/50 mb-2" />
              All queues clear
            </div>
          ) : (
            approvals.map(po => (
              <div key={po.id} className="bg-cmd-bg border border-cmd-danger/30 rounded-lg p-4 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-cmd-danger"></div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-sm">{po.id}</span>
                  <span className="text-xs text-cmd-text-secondary">{po.time}</span>
                </div>
                <div className="text-xs mb-3 space-y-1 text-cmd-text-secondary">
                  <p><span className="text-cmd-text-primary">Supplier:</span> {po.supplier}</p>
                  <p><span className="text-cmd-text-primary">Amount:</span> <span className="text-cmd-warning font-bold">{po.amount}</span></p>
                  <p><span className="text-cmd-text-primary">Items:</span> {po.items}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleApprove(po.id)}
                    className="flex-1 bg-cmd-success/10 hover:bg-cmd-success/20 text-cmd-success border border-cmd-success/30 py-1.5 rounded text-xs transition-colors font-medium flex justify-center items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" /> Approve
                  </button>
                  <button 
                    onClick={() => handleReject(po.id)}
                    className="flex-1 bg-cmd-danger/10 hover:bg-cmd-danger/20 text-cmd-danger border border-cmd-danger/30 py-1.5 rounded text-xs transition-colors font-medium flex justify-center items-center gap-1"
                  >
                    <XCircle className="w-3 h-3" /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom: Autonomous Agents Log (Spans full width) */}
      <div className="lg:col-span-3 bg-cmd-surface rounded-xl p-6 border border-gray-800/50 shadow-2xl mt-2">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-cmd-success" />
            Autonomous Agents Activity
          </h2>
          <div className="flex gap-2">
            <span className="text-xs bg-cmd-success/10 text-cmd-success px-2 py-1 rounded border border-cmd-success/20">
              2 Agents Active
            </span>
          </div>
        </div>

        <div className="bg-cmd-bg rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-900/50 border-b border-gray-800 text-cmd-text-secondary">
              <tr>
                <th className="p-3 font-medium">Time</th>
                <th className="p-3 font-medium">Agent</th>
                <th className="p-3 font-medium">Action Target</th>
                <th className="p-3 font-medium">Details</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="p-3 text-cmd-text-secondary whitespace-nowrap">{log.time}</td>
                  <td className="p-3 font-medium text-cmd-text-primary whitespace-nowrap">{log.agent}</td>
                  <td className="p-3 text-cmd-text-secondary whitespace-nowrap">{log.target}</td>
                  <td className="p-3 text-cmd-text-primary w-full">{log.details}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs border ${
                      log.status === 'Success' || log.status === 'Approved' ? 'bg-cmd-success/10 text-cmd-success border-cmd-success/30' :
                      log.status === 'Pending' || log.status === 'Alert' ? 'bg-cmd-warning/10 text-cmd-warning border-cmd-warning/30' :
                      'bg-cmd-danger/10 text-cmd-danger border-cmd-danger/30'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
