import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Clock } from "lucide-react";
import { LeadData } from "../../lib/crm";

export default function LeadManagementPanel() {
  const [leads, setLeads] = useState<
    (LeadData & { id: string; createdAt: any })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      setLeads(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, "leads", id), { status: newStatus });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-zinc-600">Loading Leads...</div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-serif text-zinc-900">
          Lead Management
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-royale-surface border border-zinc-150 rounded-2xl p-5 shadow-sm text-left"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-gold/10 text-yellow-800 border border-gold/20 rounded-md">
                {lead.type}
              </span>
              <select
                value={lead.status}
                onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                className="text-xs bg-zinc-50 border border-zinc-200 rounded p-1 text-zinc-700 outline-none"
              >
                <option value="NEW">New</option>
                <option value="FOLLOW_UP">Follow Up</option>
                <option value="CONVERTED">Converted</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <h3 className="font-bold text-zinc-900 mb-1">{lead.name}</h3>
            <p className="text-sm text-zinc-600 flex items-center gap-2 mb-1">
              <span className="font-medium text-zinc-700">{lead.phone}</span>
            </p>
            {lead.email && (
              <p className="text-xs text-zinc-600 mb-1">{lead.email}</p>
            )}

            {(lead.metadata || lead.address) && (
              <div className="mt-3 p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-600">
                {lead.address && (
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {lead.address}
                  </p>
                )}
                {lead.metadata?.projectType && (
                  <p>
                    <span className="font-semibold">Project:</span>{" "}
                    {lead.metadata.projectType}
                  </p>
                )}
                {lead.metadata?.details && (
                  <p className="mt-1">{lead.metadata.details}</p>
                )}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-zinc-100 text-[10px] text-zinc-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {lead.createdAt?.toDate
                ? lead.createdAt.toDate().toLocaleString()
                : "Recent"}
            </div>
          </div>
        ))}
        {leads.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-600">
            No leads generated yet.
          </div>
        )}
      </div>
    </div>
  );
}
