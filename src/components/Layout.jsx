import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Activity, LayoutDashboard, MessageSquare, Truck } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-cmd-bg text-cmd-text-primary p-6 font-mono flex flex-col">
      {/* Header & Navigation */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-cmd-surface pb-4 gap-4">
        <div className="flex items-center gap-3">
          <Activity className="text-cmd-success w-8 h-8 animate-pulse-slow" />
          <h1 className="text-2xl font-bold tracking-tight">AI SUPPLY CHAIN<span className="text-cmd-text-secondary ml-2 text-sm font-normal">Command Center</span></h1>
        </div>
        
        <nav className="flex items-center gap-2 bg-cmd-surface p-1 rounded-lg border border-gray-800">
          <NavLink 
            to="/" 
            target="_blank"
            rel="noopener noreferrer"
            className={({isActive}) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'bg-cmd-bg text-cmd-success border border-cmd-success/30' : 'text-cmd-text-secondary hover:text-cmd-text-primary'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </NavLink>
          <NavLink 
            to="/negotiator" 
            target="_blank"
            rel="noopener noreferrer"
            className={({isActive}) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'bg-cmd-bg text-cmd-success border border-cmd-success/30' : 'text-cmd-text-secondary hover:text-cmd-text-primary'}`}
          >
            <MessageSquare className="w-4 h-4" />
            Negotiator AI
          </NavLink>
          <NavLink 
            to="/logistics" 
            target="_blank"
            rel="noopener noreferrer"
            className={({isActive}) => `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${isActive ? 'bg-cmd-bg text-cmd-success border border-cmd-success/30' : 'text-cmd-text-secondary hover:text-cmd-text-primary'}`}
          >
            <Truck className="w-4 h-4" />
            Predictive Logistics
          </NavLink>
        </nav>

        <div className="flex items-center gap-4 text-sm hidden lg:flex">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cmd-success animate-pulse"></span>
            <span className="text-cmd-success">System Nominal</span>
          </div>
          <span className="text-cmd-text-secondary">v2.4.0-rc</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
