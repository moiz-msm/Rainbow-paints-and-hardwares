import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, doc, getDoc, updateDoc, setDoc, addDoc } from 'firebase/firestore';
import { ShieldUser, Save, Trash2, Plus, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function StaffAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [rolesConfig, setRolesConfig] = useState<any>({});
  const { role } = useAuthStore();
  const [statusMsg, setStatusMsg] = useState('');
  
  const [newRoleName, setNewRoleName] = useState('');
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('staff');

  const TABS = [
    { id: 'overview', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'users', label: 'Customers' },
    { id: 'products', label: 'Inventory' },
    { id: 'coupons', label: 'Promotions' },
    { id: 'staff', label: 'Staff Management' }
  ];

  const ROLES = Object.keys(rolesConfig).filter(k => k !== 'owner');

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setUsers(list);
    });

    const unsubRoles = onSnapshot(doc(db, 'system', 'rolesConfig'), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setRolesConfig(docSnapshot.data());
      } else {
        // Default roles config
        const defaultRoles = {
          admin: TABS.map(t => t.id),
          staff: ['overview', 'orders', 'products'],
          support: ['overview', 'orders', 'users'],
          manager: ['overview', 'orders', 'users', 'products', 'coupons'],
        };
        setRolesConfig(defaultRoles);
        setDoc(doc(db, 'system', 'rolesConfig'), defaultRoles);
      }
    });

    return () => {
      unsubUsers();
      unsubRoles();
    };
  }, []);

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (role !== 'owner' && role !== 'admin') return;
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setStatusMsg('Role updated successfully');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (e) {
      console.error(e);
      setStatusMsg('Error updating role');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleTogglePermission = async (roleName: string, tabId: string) => {
    if (role !== 'owner' && role !== 'admin') return;
    try {
      const currentPermissions = rolesConfig[roleName] || [];
      const newPermissions = currentPermissions.includes(tabId)
        ? currentPermissions.filter((id: string) => id !== tabId)
        : [...currentPermissions, tabId];

      const newConfig = { ...rolesConfig, [roleName]: newPermissions };
      await setDoc(doc(db, 'system', 'rolesConfig'), newConfig);
      
      setStatusMsg('Permissions updated');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (e) {
      console.error(e);
      setStatusMsg('Error updating permissions');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleCreateRole = async () => {
    if (!newRoleName.trim()) return;
    const roleKey = newRoleName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (rolesConfig[roleKey]) {
      setStatusMsg("Role already exists");
      return;
    }
    const newConfig = { ...rolesConfig, [roleKey]: [] };
    await setDoc(doc(db, 'system', 'rolesConfig'), newConfig);
    setNewRoleName('');
    setStatusMsg("Role created!");
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleAssignEmail = async () => {
    if (!newStaffEmail.trim() || !newStaffRole) return;
    const existing = users.find(u => u.email === newStaffEmail.trim());
    if (existing) {
      await updateDoc(doc(db, 'users', existing.id), { role: newStaffRole });
      setStatusMsg("Role updated for user");
    } else {
      const emailLower = newStaffEmail.trim().toLowerCase();
      const newConfig = { 
        ...rolesConfig, 
        _pendingEmails: {
          ...(rolesConfig._pendingEmails || {}),
          [emailLower]: newStaffRole
        }
      };
      await setDoc(doc(db, 'system', 'rolesConfig'), newConfig);
      setStatusMsg("Email assigned to role (pending user creation)");
    }
    setNewStaffEmail("");
    setTimeout(() => setStatusMsg(''), 3000);
  };

  if (role !== 'owner' && role !== 'admin') {
    return <div className="p-8 text-center text-red-500">Access Denied. You do not have permission to view staff management.</div>;
  }

  const staffMembers = users.filter((u: any) => ROLES.includes(u.role) || u.role === 'owner');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-display text-zinc-900 tracking-tight">Staff Management</h2>
        {statusMsg && <div className="text-emerald-600 font-medium text-sm bg-emerald-50 px-4 py-2 rounded-lg">{statusMsg}</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assing Staff by Email */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">
          <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-500" />
            Assign Role by Email
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="user@example.com"
              value={newStaffEmail}
              onChange={e => setNewStaffEmail(e.target.value)}
              className="flex-1 border border-zinc-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <select 
              value={newStaffRole}
              onChange={e => setNewStaffRole(e.target.value)}
              className="border border-zinc-200 p-2.5 rounded-lg text-sm bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button 
              onClick={handleAssignEmail}
              className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition"
            >
              Assign Role
            </button>
          </div>
          <p className="mt-3 text-xs text-zinc-600">If the email is not registered yet, their role will be granted when they sign up.</p>
        </div>

        {/* Create New Role */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6">
          <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-500" />
            Create New Role
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder="e.g. editor"
              value={newRoleName}
              onChange={e => setNewRoleName(e.target.value)}
              className="flex-1 border border-zinc-200 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button 
              onClick={handleCreateRole}
              className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-emerald-700 transition"
            >
              Create Role
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
            <ShieldUser className="w-5 h-5 text-indigo-500" />
            Active Staff
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-zinc-600">Name</th>
                <th className="px-6 py-3 font-semibold text-zinc-600">Email</th>
                <th className="px-6 py-3 font-semibold text-zinc-600">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {staffMembers.map(member => (
                <tr key={member.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 text-zinc-900 font-medium">{member.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-zinc-600">{member.email}</td>
                  <td className="px-6 py-4">
                    {member.role === 'owner' ? (
                      <span className="px-3 py-1 bg-zinc-900 text-zinc-100 text-xs font-bold rounded-lg truncate">Owner (Full Access)</span>
                    ) : (
                      <select 
                        value={member.role}
                        onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                        className="bg-white border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2"
                      >
                        {ROLES.map(r => (
                          <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
              {staffMembers.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-zinc-600 italic">No staff found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Configurations */}
      <h3 className="text-xl font-bold font-display text-zinc-900 tracking-tight mb-4">Role Permissions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ROLES.map(r => (
          <div key={r} className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6">
            <h4 className="font-bold text-lg text-zinc-900 capitalize mb-4 pb-2 border-b border-zinc-100">{r} Role</h4>
            <div className="space-y-3">
              {TABS.map(tab => {
                const hasAccess = (rolesConfig[r] || []).includes(tab.id);
                return (
                  <label key={tab.id} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={hasAccess} 
                      onChange={() => handleTogglePermission(r, tab.id)}
                      className="w-4 h-4 text-indigo-600 bg-zinc-100 border-zinc-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-zinc-700 text-sm font-medium">{tab.label}</span>
                  </label>
                );
              })}
            </div>
            {r === 'admin' && (
              <p className="mt-4 text-xs text-zinc-600 pt-2 border-t border-zinc-100">
                Note: Admin role always has overarching dashboard access.
              </p>
            )}
            {r !== 'admin' && r !== 'staff' && r !== 'support' && r !== 'manager' && (
              <button 
                onClick={async () => {
                  if (confirm(`Are you sure you want to delete the ${r} role?`)) {
                    const newConfig = { ...rolesConfig };
                    delete newConfig[r];
                    await setDoc(doc(db, 'system', 'rolesConfig'), newConfig);
                  }
                }}
                className="mt-4 text-xs text-red-500 hover:text-red-700 pt-2 border-t border-zinc-100 w-full text-left"
              >
                Delete Role
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
