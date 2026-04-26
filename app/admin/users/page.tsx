"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/utils/apiClient";
import { 
  Phone, ShieldCheck, Trash2, UserCog,
  Search, CheckCircle2, XCircle, ChevronLeft, ChevronRight, X, AlertCircle
} from "lucide-react";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });

  // Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [errorModal, setErrorModal] = useState<{show: boolean, msg: string}>({ show: false, msg: "" });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiClient(`/api/auth/users?page=${page}&limit=10`);
      if (res.success) {
        setUsers(res.data);
        setMeta(res.meta);
      }
    } catch (error) {
      showError("Could not connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const showError = (msg: string) => setErrorModal({ show: true, msg });

  // --- ACTIONS ---

  const handleToggleVerify = async (user: User) => {
    try {
      const res = await apiClient(`/api/auth/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isVerified: !user.isVerified })
      });
      if (res.success) {
        fetchUsers(meta.page);
      } else {
        showError(res.message || "Failed to update verification status.");
      }
    } catch (err) {
      showError("An unexpected error occurred while updating the user.");
    }
  };

const handleUpdateUser = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!selectedUser) return;

  const updateData = {
    firstName: selectedUser.firstName,
    lastName: selectedUser.lastName,
    role: selectedUser.role,
    email: selectedUser.email,
    phone: selectedUser.phone,
    isVerified: selectedUser.isVerified
  };

  try {
    const res = await apiClient(`/api/auth/users/${selectedUser.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData) // Send the clean object
    });
    
    if (res.success) {
      setIsEditOpen(false);
      fetchUsers(meta.page);
    } else {
      showError(res.message || "Failed to save user details.");
    }
  } catch (err) {
    showError("Network error: Could not update user.");
  }
};

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await apiClient(`/api/auth/users/${selectedUser.id}`, { method: "DELETE" });
      if (res.success) {
        setIsDeleteOpen(false);
        fetchUsers(1);
      } else {
        showError("You do not have permission to delete this user.");
      }
    } catch (err) {
      showError("Action failed. The user might have already been removed.");
    }
  };

  const filteredUsers = users.filter(u => 
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#004795] tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-1">Manage verification and roles for KHS Staff</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" placeholder="Search staff members..." 
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl w-full md:w-80 outline-none focus:ring-2 focus:ring-[#004795] shadow-sm"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black uppercase text-slate-400 tracking-widest">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Verification Toggle</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#004795] text-white flex items-center justify-center font-black">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* TOGGLE SWITCH */}
                    <button 
                      onClick={() => handleToggleVerify(user)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        user.isVerified ? 'bg-[#004795]' : 'bg-slate-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        user.isVerified ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                    <span className={`text-[10px] font-black uppercase ${user.isVerified ? 'text-[#004795]' : 'text-slate-400'}`}>
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-black uppercase bg-slate-100 px-2.5 py-1 rounded-lg text-slate-600">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => { setSelectedUser(user); setIsEditOpen(true); }}
                      className="p-2 hover:bg-blue-50 text-slate-400 hover:text-[#004795] rounded-xl transition-all"
                    >
                      <UserCog size={18} />
                    </button>
                    <button 
                      onClick={() => { setSelectedUser(user); setIsDeleteOpen(true); }}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-[#E31E24] rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ERROR MODAL --- */}
      {errorModal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-8 text-center shadow-2xl border-t-4 border-[#E31E24] animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-red-50 text-[#E31E24] rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Action Failed</h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">{errorModal.msg}</p>
            <button 
              onClick={() => setErrorModal({ show: false, msg: "" })}
              className="w-full py-3 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* --- EDIT MODAL --- */}
   {isEditOpen && selectedUser && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative">
      <button 
        onClick={() => setIsEditOpen(false)} 
        className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X size={24} />
      </button>

      <h2 className="text-2xl font-black text-[#004795] mb-6">Update Staff Profile</h2>
      
      <form onSubmit={handleUpdateUser} className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">First Name</label>
            <input 
              className="p-3 bg-slate-50 border border-slate-100 rounded-2xl w-full text-sm outline-none focus:ring-2 focus:ring-[#004795] transition-all"
              value={selectedUser.firstName} 
              onChange={e => setSelectedUser({...selectedUser, firstName: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Last Name</label>
            <input 
              className="p-3 bg-slate-50 border border-slate-100 rounded-2xl w-full text-sm outline-none focus:ring-2 focus:ring-[#004795] transition-all"
              value={selectedUser.lastName} 
              onChange={e => setSelectedUser({...selectedUser, lastName: e.target.value})}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Email Address</label>
          <input 
            type="email"
            className="p-3 bg-slate-50 border border-slate-100 rounded-2xl w-full text-sm outline-none focus:ring-2 focus:ring-[#004795] transition-all"
            value={selectedUser.email} 
            onChange={e => setSelectedUser({...selectedUser, email: e.target.value})}
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Phone Number</label>
          <input 
            type="tel"
            className="p-3 bg-slate-50 border border-slate-100 rounded-2xl w-full text-sm outline-none focus:ring-2 focus:ring-[#004795] transition-all"
            value={selectedUser.phone} 
            onChange={e => setSelectedUser({...selectedUser, phone: e.target.value})}
          />
        </div>

        {/* Role Field */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Assigned Role</label>
          <select 
            className="p-3 bg-slate-50 border border-slate-100 rounded-2xl w-full text-sm outline-none cursor-pointer focus:ring-2 focus:ring-[#004795] transition-all"
            value={selectedUser.role}
            onChange={e => setSelectedUser({...selectedUser, role: e.target.value as any})}
          >
            <option value="teacher">Teacher</option>
            <option value="Headmaster">Headmaster</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full mt-4 py-4 bg-[#004795] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#003570] transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
)}

      {/* --- DELETE CONFIRMATION --- */}
      {isDeleteOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 text-center shadow-2xl">
            <div className="w-20 h-20 bg-red-50 text-[#E31E24] rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={40} />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Delete User?</h2>
            <p className="text-sm text-slate-500 mb-8">This will remove <b>{selectedUser.firstName}</b> permanently from the system.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteOpen(false)} className="flex-1 py-3 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={handleDeleteUser} className="flex-1 py-3 bg-[#E31E24] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-red-900/10">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}