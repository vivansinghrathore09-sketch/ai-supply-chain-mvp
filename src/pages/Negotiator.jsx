import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Server, Zap, CheckCircle, Bot, User } from 'lucide-react';

const INITIAL_MESSAGES = [
  { id: 1, sender: 'agent', text: 'Initiating connection to Uline Wholesale API...', time: '14:00:01' },
  { id: 2, sender: 'system', text: 'Connection established. Auth token verified.', time: '14:00:03' },
  { id: 3, sender: 'agent', text: 'Requesting bulk quote for 10,000 Thermal Rolls (Item #S-14221)', time: '14:00:05' },
  { id: 4, sender: 'supplier', text: 'Standard quote generated: $5,200.00 ($0.52/roll). Delivery in 3 days.', time: '14:00:12' },
  { id: 5, sender: 'agent', text: 'Analyzing historical data. Our average price is $0.48/roll. Generating counter-offer...', time: '14:00:14' },
];

export default function Negotiator() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const simulateNegotiation = () => {
    if (messages.length > 5) return; // Prevent multiple runs

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: 6, sender: 'agent', text: 'Applying bulk tier discount code [VOLUME-2026] and requesting $4,500.00 ($0.45/roll).', time: '14:00:25' }]);
        
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: 7, sender: 'supplier', text: 'Counter-offer rejected. Minimum margin requirement not met. Best alternative offer: $4,750.00 ($0.475/roll).', time: '14:00:45' }]);
            
            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { id: 8, sender: 'agent', text: 'Accepting $4,750.00. Sending draft PO to Human-in-the-loop queue for final approval.', time: '14:01:05' }]);
                
                setTimeout(() => {
                  setMessages(prev => [...prev, { id: 9, sender: 'system', text: 'Negotiation concluded. Saved $450.00 vs standard quote.', time: '14:01:06', success: true }]);
                }, 1000);
              }, 2000);
            }, 1500);
          }, 3000);
        }, 2000);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] animate-fade-in-up">
      
      {/* Context Panel */}
      <div className="bg-cmd-surface rounded-xl p-6 border border-gray-800/50 shadow-2xl flex flex-col h-full">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-cmd-text-primary">
          <Server className="w-5 h-5 text-cmd-warning" />
          Negotiation Target
        </h2>
        
        <div className="flex-1 space-y-6">
          <div className="bg-cmd-bg p-4 rounded-lg border border-gray-800">
            <h3 className="text-sm text-cmd-text-secondary mb-1">Supplier</h3>
            <p className="text-xl font-bold">Uline Inc.</p>
            <div className="mt-2 text-xs flex gap-2">
              <span className="bg-cmd-success/10 text-cmd-success px-2 py-0.5 rounded border border-cmd-success/20">API Connected</span>
              <span className="bg-gray-800 text-cmd-text-secondary px-2 py-0.5 rounded">Response Time: 120ms</span>
            </div>
          </div>

          <div className="bg-cmd-bg p-4 rounded-lg border border-gray-800">
            <h3 className="text-sm text-cmd-text-secondary mb-1">Procurement Item</h3>
            <p className="font-bold">Thermal Rolls (Item #S-14221)</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-800 pb-1">
                <span className="text-cmd-text-secondary">Quantity</span>
                <span>10,000 units</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1">
                <span className="text-cmd-text-secondary">Target Price</span>
                <span className="text-cmd-success">$4,800.00 MAX</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-1">
                <span className="text-cmd-text-secondary">Standard Price</span>
                <span className="text-cmd-danger">$5,200.00</span>
              </div>
            </div>
          </div>

          <button 
            onClick={simulateNegotiation}
            className="w-full bg-cmd-success/10 hover:bg-cmd-success/20 text-cmd-success border border-cmd-success/30 py-3 rounded-lg transition-colors font-bold flex justify-center items-center gap-2 mt-auto"
          >
            <Zap className="w-4 h-4" /> Start Auto-Negotiation
          </button>
        </div>
      </div>

      {/* Chat Terminal */}
      <div className="lg:col-span-2 bg-cmd-surface rounded-xl p-6 border border-gray-800/50 shadow-2xl flex flex-col h-full relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cmd-text-primary" />
            <h2 className="text-lg font-bold">Live Agent Terminal</h2>
          </div>
          <span className="text-xs font-mono text-cmd-success animate-pulse">AGENT: ACTIVE</span>
        </div>

        {/* Chat Log */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 font-mono text-sm">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'agent' ? 'items-end' : 'items-start'}`}>
              <div className={`flex items-center gap-2 mb-1 text-xs ${msg.sender === 'agent' ? 'text-cmd-success' : msg.sender === 'system' ? 'text-cmd-warning' : 'text-cmd-text-secondary'}`}>
                {msg.sender === 'agent' && <Bot className="w-3 h-3" />}
                {msg.sender === 'supplier' && <Server className="w-3 h-3" />}
                {msg.time} - {msg.sender.toUpperCase()}
              </div>
              <div className={`max-w-[80%] p-3 rounded-lg border ${
                msg.sender === 'agent' 
                  ? 'bg-cmd-success/10 border-cmd-success/30 text-cmd-success rounded-tr-none' 
                  : msg.sender === 'supplier'
                    ? 'bg-cmd-bg border-gray-700 text-cmd-text-primary rounded-tl-none'
                    : msg.success 
                      ? 'bg-cmd-success/20 border-cmd-success/50 text-cmd-success w-full text-center font-bold'
                      : 'bg-cmd-warning/10 border-cmd-warning/30 text-cmd-warning w-full text-center'
              }`}>
                {msg.success && <CheckCircle className="inline w-4 h-4 mr-2 -mt-1" />}
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1 text-xs text-cmd-text-secondary">
                <Server className="w-3 h-3" />
                Processing...
              </div>
              <div className="bg-cmd-bg border border-gray-700 p-3 rounded-lg rounded-tl-none flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}
