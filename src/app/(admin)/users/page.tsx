"use client";
import axios from 'axios';
import React, { AnyActionArg, useEffect, useState, } from "react";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Pagination from "@/components/pagination/pagination";
import { useSearchParams, useRouter } from "next/navigation";

import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";

type Role = "Admin" | "User" | "Manager";
type Status = "Active" | "Pending" | "Inactive";

type User = {
  UserID: number;
  Username: string;
  Email: string;
  RoleID: string;
  IsActive: number;
  SiteIDs: string;
  
};

 



function uid(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export default function UsersPage() {

   const searchParams = useSearchParams();
  const router = useRouter();

  const initialQ = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [q, setQ] = useState(initialQ);          // controlled input
  const [page, setPage] = useState(initialPage); // current page state
 
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);



  const [users, setUsers] = useState([]);
 
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);




  
 

// Debounce typing
  const [debouncedQ, setDebouncedQ] = useState(q);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQ(q), 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [q]);

 // Fetch users
  const fetchUsersData = async () => {
    setLoading(true);
    const res = await fetch(`/api/user/users?q=${q}&page=${page}`);
    const data = await res.json();
    
    setUsers(data.records);
    setCount(data.filtered);
    setLoading(false);
  };


  // Fetch users when page or debounced query changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const res = await fetch(`/api/user/users?q=${debouncedQ}&page=${page}`);
      const data = await res.json();
    
      setUsers(data.records);
      setCount(data.filtered);

      setLoading(false);
    };

    fetchUsers();
  }, [debouncedQ, page]);


  

const changePage = (p: number) => {
  if (p < 1) p = 1;
  if (p > count) p = count;
  setPage(p); // triggers useEffect to fetch new page
};
  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (u :User) => {
    
    setEditing(u);
 

    setModalOpen(true);
  };  

  const handleDelete = (u: any) => {
    if (!confirm(`Delete ${u.Username}?`)) return;
    // setUsers((prev) => prev.filter((x) => x.id !== u.id));
  };

  const handleSave = (payload: Omit<User, "id">) => {
    // if (editing) {
    //   setUsers((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...payload } : p)));
    // } else {
    //   const newUser: User = { id: uid(), ...payload };
    //   setUsers((prev) => [newUser, ...prev]);
    // }
    fetchUsersData();
    setModalOpen(false);
    setEditing(null);
  };



  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">U</div>
          <h1 className="text-2xl font-semibold">User Management</h1>
        </div>

        <div className="flex items-center gap-3">
             {/* Search Form */}
      
          <input
            type="text"
            placeholder="Search by name, email "
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            className="px-3 py-2 border rounded-md text-sm w-72"
            aria-label="Search users"
          />
         

         
          <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
            Add User
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Allow Sites</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-500">No users found.</td>
                </tr>
              ) : (
                users.map((u :any) => (
                  <tr key={u.UserID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium">{u.Username.charAt(0)}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{u.Username}</div>
                          
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.Email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.RoleName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.SiteNames}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${u.IsActive === true ? "bg-green-100 text-green-800" : ""}  ${u.IsActive !==true? "bg-gray-100 text-gray-700" : ""}`}>{u.IsActive===true?"Active":"InActive"}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      { <button onClick={() => openEdit(u)} className="inline-flex items-center p-1 rounded hover:bg-gray-100 mr-2" title="Edit" aria-label={`Edit ${u.Username}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L15.13 4.9l3.75 3.75 1.83-1.61z"/></svg>
                      </button> }
                      <button onClick={() => handleDelete(u)} className="inline-flex items-center p-1 rounded hover:bg-gray-100 text-red-600" title="Delete" aria-label={`Delete ${u.Username}`}>
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
     <div className="flex gap-2 mt-4">
  <button
    onClick={() => changePage(page - 1)}
    disabled={page <= 1}
    className="px-3 py-1 bg-gray-200"
  >
    Prev
  </button>

  {Array.from({ length: count }, (_, i) => i + 1).map((p) => (
    <button
      key={p}
      onClick={() => changePage(p)}
      className={`px-3 py-1 border ${p === page ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    >
      {p}
    </button>
  ))}

  <button
    onClick={() => changePage(page + 1)}
    disabled={page >= count}
    className="px-3 py-1 bg-gray-200"
  >
    Next
  </button>
</div>
</>)}
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
      )
      
      }

    </main>
  );
}



type UserFormProps = {
  initial: User | null;
  onSave: (payload: Omit<User, "id">) => void;
  onCancel: () => void;
};

function UserForm({ initial, onSave, onCancel }: UserFormProps) {
 
  
  
  const [error, setError] = useState<FormError>({});

  
  const [DataAreaIdrecords, setDataAreaIdRecords] = useState<any[]>([]);
  const [DataRolesrecords, setDataRolesRecords] = useState<any[]>([]);
const [selectedSites, setSelectedSites] = useState<number[]>(
  initial?.SiteIDs ? initial.SiteIDs.split(',').map(Number) : []
);
   
  useEffect(() => {
  async function fetchData() {
    try {
       const res1 = await axios.get(`api/dynamics?type=company`);
         setDataAreaIdRecords( res1.data.result.recordset);

          const res2 = await axios.get(`api/dynamics?type=roles`);
         setDataRolesRecords( res2.data.result.recordset);
     
    } catch (err :any) {
     alert(err.response?.data?.message );
    }
  }
  fetchData();
}, []); 

 
    const handleCheckboxChange = (optionId :any) => {

    setSelectedSites((prev :any) =>
      prev.includes(optionId)
        ? prev.filter((id :any) => id !== optionId)
        : [...prev, optionId]
    );
  };

   const [showPassword, setShowPassword] = useState(false);
   const [site, setSite] = useState('');


  const [password, setPassword] = useState('');

  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   site:"",
  //   role :"",
  //   status:"",
  //   siteIds: "",
  // });


const [form, setForm] = useState(() => ({
  name: initial?.Username || "",
  email: initial?.Email || "",
  password: "",
  site:  "",
  role:  initial?.RoleID || "",
  status: initial?.IsActive===true?1:0 ,
  siteIds:  initial?.SiteIDs.split(',').map(Number)|| "",
 
}));





  

type FormError = {
  name?: boolean;
  email?: boolean;
  password?: boolean; 
  site?: boolean;
  role?: boolean;
  status?: boolean;
};


    // universal change handler
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: false }); // remove error when typing

        setForm(form => ({
      ...form,
      siteIds: selectedSites
    }));
  };

  // useEffect(() => {
  //   setName(initial?.name ?? "");
  //   setEmail(initial?.email ?? "");
  //   setPassword(initial?.password ?? "");
  //   setSite(initial?.site ?? "1");
  //   setRole(initial?.role ?? "User");
  //   setStatus(initial?.status ?? "Active");
  // }, [initial]);





  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
     

    // if (!name.trim() || !email.trim() ) {
    //   alert("Name and email are required.");
    //   return;
    // }

    const newError: FormError = {}; // type-safe
    if (!form.name.trim()) newError.name = true;
    if (!form.email.trim()) newError.email = true;
    if (!form.password.trim()) newError.password = true;
    if (selectedSites.length === 0) newError.site = true;
    if (!form.role.trim()) newError.role = true;
    if (!form.status.trim()) newError.status = true;


    setError(newError);

   
    
    if (Object.keys(newError).length > 0) return; // stop if error



  const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username:form.name,
        email:form.email,
        rawpassword:form.password,
        isActive: form.status,
        role_Id: form.role,
        sitesIds:form.siteIds.toString(),
      })
    });

  //  if (res.ok) alert("User created");


    onSave({ Username: name.trim(), Email: email.trim(),password:password.trim(),site:site.trim(), role, status });
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
        {  initial==null ?(
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
                  </div>):('')
                  
                  }
                   <div className="mt-5">

          <label className="block text-sm font-medium mb-1">Sites</label>
              

           
  <div className={`flex flex-wrap items-center gap-4  ${
    error.site ? "border border-red-500 bg-red-50" : ""
  }`}>
            {DataAreaIdrecords.map((option :any) => (
              <div key={option.Id} className="flex items-center gap-2">
              
                  <input
                    name="site"
                    type="checkbox"
                    checked={selectedSites.includes(option.Id)}
                    onChange={() => handleCheckboxChange(option.Id)}

                    
                  />
                   <span>{option.SiteName}</span>
                
               
              </div>
            ))}
            </div>
        

            {/* <select  value={form.site}  name="site" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.site ? "border-red-500" : "border-gray-300" }`} aria-label="site">
                 <option value="">Select Site</option>
              <option value="RGD">RGD</option>
              <option  value="MRP">MRP</option>
              <option value="MCS">MCS</option>
              <option value="BPD">BPD</option>
            </select>
           */}


          
          </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="mt-5">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
            key={"0"}
            name="role"
            id="role"
            value={form.role}
            onChange={handleChange}

            className={`w-full border rounded px-3 py-2 ${
            error.role ? "border-red-500" : "border-gray-300" }`} aria-label="Role"
          >
          <option value="" disabled>Select Role</option>
            {DataRolesrecords?.length > 0 ? (
              DataRolesrecords.map((id) => (
                <option key={id.Id} value={id.Id}>
                  {id.RoleName}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
           
            {/* <select value={form.role} name="role" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.role ? "border-red-500" : "border-gray-300" }`} aria-label="Role">
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>


             <option value="QAOfficer">QA Officer</option>
              <option value="QA/QCManager">QA/QC Manager</option>
              <option value="Manager">Head of QA/QC-PCQI</option>

            </select> */}
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select value={form.status}  name="status" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.status ? "border-red-500" : "border-gray-300" }`} aria-label="Status">
              <option value="" disabled>Select Status</option>
              <option value="1">Active</option>
              {/* <option value="Pending">Pending</option> */}
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>
 <input
            type="hidden"
            id="sitesIds"
            name="sitesIds"
            value={selectedSites}
          />
        <div className="mt-4 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-3 py-2 rounded border">Cancel</button>
          <button type="submit" className="px-3 py-2 rounded bg-indigo-600 text-white">Save</button>
        </div>
      </div>
    </form>
  );
}