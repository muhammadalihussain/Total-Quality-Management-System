"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/form/input/InputField";

import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";

type Role = "Admin" | "User" | "Manager";
type Status = "Active" | "Pending" | "Inactive";

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  site:string;
  password:string;
  status: Status;
}

const STORAGE_KEY = "tailadmin_users_v1";
const ALT_KEYS = ["tailadmin_users", "tailadmin_users_v0"];

const INITIAL_USERS: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com",password:"12345",site:"1", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com",password:"12345",site:"1",  role: "User", status: "Inactive" },
  { id: 3, name: "Cecilia Brown", email: "cecilia@example.com",password:"12345",site:"1", role: "Manager", status: "Active" },
];

function uid(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  useEffect(() => {
    try {
      let raw: string | null = null;
      let foundKey: string | null = null;

      const keysToCheck = [STORAGE_KEY, ...ALT_KEYS];
      for (const k of keysToCheck) {
        const v = localStorage.getItem(k);
        if (v) {
          raw = v;
          foundKey = k;
          break;
        }
      }

      if (!raw) {
        console.info("[UsersPage] no localStorage entry found — seeding INITIAL_USERS");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        setUsers(INITIAL_USERS);
        return;
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch (parseErr) {
        console.warn("[UsersPage] stored JSON is invalid — resetting to INITIAL_USERS", parseErr);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        setUsers(INITIAL_USERS);
        return;
      }

      if (!Array.isArray(parsed)) {
        console.warn("[UsersPage] parsed value is not an array — resetting to INITIAL_USERS", parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        setUsers(INITIAL_USERS);
        return;
      }

      if ((parsed as any[]).length === 0) {
        console.info("[UsersPage] parsed array empty — seeding INITIAL_USERS");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        setUsers(INITIAL_USERS);
        return;
      }

      if (foundKey && foundKey !== STORAGE_KEY) {
        console.info(`[UsersPage] migrating users from ${foundKey} -> ${STORAGE_KEY}`);
        try {
          localStorage.setItem(STORAGE_KEY, raw);
        } catch (e) {
          console.warn("[UsersPage] migration write failed", e);
        }
      }

      setUsers(parsed as User[]);
      console.info(`[UsersPage] loaded ${ (parsed as any[]).length } users from storage (${foundKey ?? STORAGE_KEY})`);
    } catch (err) {
      console.error("[UsersPage] unexpected error while loading users, seeding fallback", err);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS)); } catch {}
      setUsers(INITIAL_USERS);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (err) {
      console.error("[UsersPage] failed to persist users to localStorage", err);
    }
  }, [users]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (u: User) => {
    setEditing(u);
    setModalOpen(true);
  };

  const handleDelete = (u: User) => {
    if (!confirm(`Delete ${u.name}?`)) return;
    setUsers((prev) => prev.filter((x) => x.id !== u.id));
  };

  const handleSave = (payload: Omit<User, "id">) => {
    if (editing) {
      setUsers((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...payload } : p)));
    } else {
      const newUser: User = { id: uid(), ...payload };
      setUsers((prev) => [newUser, ...prev]);
    }
    setModalOpen(false);
    setEditing(null);
  };

  const filtered = users.filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.status.toLowerCase().includes(q)
    );
  });

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">U</div>
          <h1 className="text-2xl font-semibold">User Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search by name, email or role"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm w-72"
            aria-label="Search users"
          />
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-500">No users found.</td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium">{u.name.charAt(0)}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{u.name}</div>
                          <div className="text-xs text-gray-500">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${u.status === "Active" ? "bg-green-100 text-green-800" : ""} ${u.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""} ${u.status === "Inactive" ? "bg-gray-100 text-gray-700" : ""}`}>{u.status}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => openEdit(u)} className="inline-flex items-center p-1 rounded hover:bg-gray-100 mr-2" title="Edit" aria-label={`Edit ${u.name}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L15.13 4.9l3.75 3.75 1.83-1.61z"/></svg>
                      </button>
                      <button onClick={() => handleDelete(u)} className="inline-flex items-center p-1 rounded hover:bg-gray-100 text-red-600" title="Delete" aria-label={`Delete ${u.name}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={() => { setModalOpen(false); setEditing(null); }} aria-hidden="true"></div>

          <div className="bg-white rounded-lg shadow-lg z-50 w-full max-w-lg mx-4">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-medium">{editing ? "Edit User" : "Add User"}</h3>
              <button onClick={() => { setModalOpen(false); setEditing(null); }} className="text-gray-500 hover:text-gray-700" aria-label="Close modal">✕</button>
            </div>

            <UserForm initial={editing} onCancel={() => { setModalOpen(false); setEditing(null); }} onSave={handleSave} />
          </div>
        </div>
      )}
    </main>
  );
}


type UserFormProps = {
  initial: User | null;
  onSave: (payload: Omit<User, "id">) => void;
  onCancel: () => void;
};

function UserForm({ initial, onSave, onCancel }: UserFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [role, setRole] = useState<Role>(initial?.role ?? "User");
  const [status, setStatus] = useState<Status>(initial?.status ?? "Active");

   const [showPassword, setShowPassword] = useState(false);
   const [site, setSite] = useState('');


  const [password, setPassword] = useState('');

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    site:"",
    role :"",
    status:""
  });

type FormError = {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  site?: boolean;
  role?: boolean;
  status?: boolean;
};
const [error, setError] = useState<FormError>({});

    // universal change handler
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: false }); // remove error when typing
  };

  useEffect(() => {
    setName(initial?.name ?? "");
    setEmail(initial?.email ?? "");
    setPassword(initial?.password ?? "");
    setSite(initial?.site ?? "1");
    setRole(initial?.role ?? "User");
    setStatus(initial?.status ?? "Active");
  }, [initial]);



  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (!name.trim() || !email.trim() ) {
    //   alert("Name and email are required.");
    //   return;
    // }

    const newError: FormError = {}; // type-safe
    if (!form.name.trim()) newError.name = true;
    if (!form.email.trim()) newError.email = true;
    if (!form.password.trim()) newError.password = true;
    if (!form.site.trim()) newError.site = true;
    if (!form.role.trim()) newError.role = true;
    if (!form.status.trim()) newError.status = true;

    setError(newError);

    if (Object.keys(newError).length > 0) return; // stop if error


    onSave({ name: name.trim(), email: email.trim(),password:password.trim(),site:site.trim(), role, status });
  };

  return (
    <form onSubmit={submit}>
      <div className="p-4">
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Full name</label>
          <input value={form.name} name="name" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.name ? "border-red-500" : "border-gray-300" }`} aria-label="Full name" />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input value={form.email} name="email" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.email ? "border-red-500" : "border-gray-300" }`} aria-label="Email" />
        </div>

         <div className="relative">
           <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      name="password"
                   className={`w-full border rounded px-3 py-2 ${
            error.password ? "border-red-500" : "border-gray-300" }`}
                       onChange={handleChange }  
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 mt-5"  />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 mt-5" />
                      )}
                    </span>
                  </div>
                   <div className="mt-5">

                        <label className="block text-sm font-medium mb-1">Site</label>
              
            <select  value={form.site}  name="site" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.site ? "border-red-500" : "border-gray-300" }`} aria-label="site">
                 <option value="">Select Site</option>
              <option value="RGD">RGD</option>
              <option  value="MRP">MRP</option>
              <option value="MCS">MCS</option>
              <option value="BPD">BPD</option>
            </select>
                </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="mt-5">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select value={form.role} name="role" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.role ? "border-red-500" : "border-gray-300" }`} aria-label="Role">
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select value={form.status}  name="status" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.status ? "border-red-500" : "border-gray-300" }`} aria-label="Status">
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-3 py-2 rounded border">Cancel</button>
          <button type="submit" className="px-3 py-2 rounded bg-indigo-600 text-white">Save</button>
        </div>
      </div>
    </form>
  );
}