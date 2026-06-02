import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { Activity, Clock, ShoppingCart, User, AlertCircle, RefreshCw } from "lucide-react";

export default function OperationsAdmin() {
  const [logs, setLogs] = useState<any[]>([]);
  const [carts, setCarts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'logs' | 'carts'>('logs');

  useEffect(() => {
    const qLogs = query(collection(db, "activity_logs"), orderBy("timestamp", "desc"), limit(200));
    const unsubLogs = onSnapshot(qLogs, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setLogs(list);
      setLoading(false);
    });

    const qCarts = query(collection(db, "abandoned_carts"));
    const unsubCarts = onSnapshot(qCarts, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      // Sort in JS instead of compound query to avoid index requirements
      list.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      setCarts(list);
    });

    return () => {
      unsubLogs();
      unsubCarts();
    };
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-zinc-500">Loading Operations Data...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="py-4 px-6 border-b border-zinc-200 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-50/50 gap-4">
        <h2 className="text-xl font-bold font-serif text-zinc-900 tracking-tight flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Store Operations
        </h2>
        
        <div className="flex bg-zinc-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === 'logs' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Audit Logs
          </button>
          <button
            onClick={() => setActiveTab('carts')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === 'carts' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Active & Abandoned Carts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-zinc-50">
        {activeTab === 'logs' ? (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-600">Recent System Activity (Last 200 events)</span>
            </div>
            
            <div className="space-y-3">
              {logs.length === 0 ? (
                <p className="text-zinc-500 text-sm text-center py-10">No activity logged recently.</p>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="bg-white p-4 rounded-xl border border-zinc-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className={`p-2.5 rounded-lg shrink-0 ${
                      log.type?.includes('ORDER') ? 'bg-emerald-50 text-emerald-600' :
                      log.type?.includes('LOGIN') || log.type?.includes('AUTH') ? 'bg-indigo-50 text-indigo-600' :
                      log.type?.includes('DELETE') || log.type?.includes('ERROR') ? 'bg-red-50 text-red-600' :
                       'bg-zinc-100 text-zinc-600'
                    }`}>
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider">{log.type}</span>
                        <span className="text-[10px] text-zinc-400 whitespace-nowrap">• {new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-zinc-600">{log.message}</p>
                    </div>
                    {log.userId && (
                      <div className="shrink-0 flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-50 px-2.5 py-1.5 rounded-md border border-zinc-100">
                        <User className="w-3.5 h-3.5" />
                        <span className="font-mono text-[10px]">{log.userId.slice(0,8)}...</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="p-6">
             <div className="flex items-center gap-2 mb-6 text-sm font-medium text-zinc-600">
               <AlertCircle className="w-4 h-4 text-amber-500" />
               Live Tracking of In-Progress Sessions
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carts.length === 0 ? (
                  <p className="text-zinc-500 text-sm col-span-full text-center py-10">No active carts at the moment.</p>
                ) : (
                  carts.map(cart => {
                    const totalValue = cart.items?.reduce((acc: number, item: any) => acc + ((item.unitPrice || 0) * (item.quantity || 1)), 0) || 0;
                    const isStale = (Date.now() - (cart.updatedAt || 0)) > (1000 * 60 * 60 * 2); // 2 hours
                    
                    return (
                      <div key={cart.id} className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm relative overflow-hidden group">
                        {isStale && (
                           <div className="absolute top-0 right-0 bg-red-50 text-red-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-bl-lg">
                             Abandoned
                           </div>
                        )}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg ${isStale ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            <ShoppingCart className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-mono text-zinc-500 truncate max-w-[150px]">{cart.id}</p>
                            <p className="text-[10px] text-zinc-400">{new Date(cart.updatedAt || Date.now()).toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-4 border-t border-zinc-100 pt-4">
                          {cart.items?.slice(0, 3).map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className="text-zinc-600 truncate mr-2">{item.quantity}x {item.name}</span>
                              <span className="font-medium text-zinc-900">₹{(item.unitPrice * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                          {(cart.items?.length || 0) > 3 && (
                            <div className="text-[10px] text-zinc-400 italic">...and {(cart.items?.length || 0) - 3} more items</div>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-auto border-t border-zinc-100 pt-4">
                           <span className="text-xs text-zinc-500">Cart Value</span>
                           <span className="font-bold text-zinc-900">₹{totalValue.toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  })
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
