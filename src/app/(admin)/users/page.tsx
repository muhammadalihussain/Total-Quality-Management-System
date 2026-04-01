"use client";
import axios from 'axios';
import React, { AnyActionArg, useEffect, useState, } from "react";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Pagination from "@/components/pagination/pagination";
import { useSearchParams, useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";

// type Role = "Admin" | "User" | "Manager";
// type Status = "Active" | "Pending" | "Inactive";

type User = {
  UserID: number;
  Username: string;
  Email: string;
  RoleID: string;
  DeptId:string
  IsActive: number;
  SiteIDs: string;
  Password:string;
  RawPassword:string;
  
};

 



function uid(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export default function UsersPage() {

    const successModal = useModal();
    const infoModal = useModal();
    const warningModal = useModal();
    const errorModal = useModal();
     const [message, setMessage] = useState('');
     const [error,setError] = useState("");
   const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [q, setQ] = useState(initialQ);          // controlled input
  const [page, setPage] = useState(initialPage); // current page state
 
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
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


  const totalPages = Math.ceil(count / 10);

const changePage = (p: number) => {
  if (p < 1) p = 1;
  if (p > totalPages) p = totalPages;
  setPage(p);
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

    setSelectedUser(u);
    setShowDelete(true);
  };

  const handleDeleteConfirm = async (id: number) => {
   
  try {
    const res = await axios.delete(`/api/user/users/${id}`);


if(res.data.success){
     // setMessage(res.data.message);
    //  successModal.openModal();
      setError("");
    }else{
      setError(res.data.message);
    }

 } catch (err:any) {
    setError(err.response?.data?.message || "Something went wrong");
    errorModal.openModal();
  }

  setShowDelete(false);
  // refresh data
  fetchUsersData();
};
const handleSave = async (payload: UpdateUserPayload) => {
  const { UserID, ...data } = payload;

    if (editing) {

try
{

const res =await axios.put(`/api/user/users/${UserID}`, {
        username:data.Username,
        email:data.Email,
        rawpassword:data.Password,
        isActive: data.IsActive,
        role_Id: data.RoleID?.toString(),
        departmentId: data.DeptId?.toString(),
        sitesIds:data.SiteIDs,
});
if(res.data.success){
     // setMessage(res.data.message);
    //  successModal.openModal();
      setError("");
    }else{
      setError(res.data.message);
    }

 } catch (err:any) {
    setError(err.response?.data?.message || "Something went wrong");
    errorModal.openModal();
  }

     // setUsers((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...payload } : p)));
    } else {

    
      
      try
      {
  const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username:data.Username,
        email:data.Email,
        rawpassword:data.Password,
        isActive: data.IsActive,
        role_Id: data.RoleID,
        departmentId: data.DeptId,
        sitesIds:data.SiteIDs,
      })
    });

    if(res){
     // setMessage(res.data.message);
    //  successModal.openModal();
      setError("");
    }else{
      setError(res);
    }

 } catch (err:any) {
    setError(err.response?.data?.message || "Something went wrong");
    errorModal.openModal();
  }
 


      // const newUser: User = { id: uid(), ...payload };
      // setUsers((prev) => [newUser, ...prev]);

    }
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
            placeholder="Search by name, email or department "
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

   <ComponentCard title="User Management">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Allow Sites</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {users?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-500">No users found.</td>
                </tr>
              ) : (
                users?.map((u :any) => (
                  <tr key={u.UserID} className="hover:bg-gray-50">
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.Username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.Email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{u.DepartmentName}</td>
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

{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
  <button
    key={p}
    onClick={() => changePage(p)}
    className={`px-3 py-1 border ${
      p === page ? "bg-blue-500 text-white" : "bg-gray-200"
    }`}
  >
    {p}
  </button>
))}

<button
  onClick={() => changePage(page + 1)}
  disabled={page >= totalPages}
  className="px-3 py-1 bg-gray-200"
>
  Next
</button>
</div>
</ComponentCard>
</>

)}

{showDelete && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    
    <div className="bg-white rounded-xl shadow-2xl w-[420px] p-6 animate-scaleIn">
      
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 p-3 rounded-full">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
            />
          </svg>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Delete User
      </h2>

      {/* Message */}
      <p className="text-gray-500 text-center mt-2">
        Are you sure you want to delete  
        <span className="font-semibold text-red-600">
          {" "} {selectedUser?.Username}
        </span> ?
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        
        <button
          onClick={() => setShowDelete(false)}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => handleDeleteConfirm(selectedUser.UserID)}
          className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow"
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}

   {/* Error Modal */}
      <Modal
        isOpen={errorModal.isOpen}
        onClose={errorModal.closeModal}
        className="max-w-[600px] p-5 lg:p-10"
      >
        <div className="text-center">
          <div className="relative flex items-center justify-center z-1 mb-7">
            <svg
              className="fill-error-50 dark:fill-error-500/15"
              width="90"
              height="90"
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                fill=""
                fillOpacity=""
              />
            </svg>

            <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <svg
                className="fill-error-600 dark:fill-error-500"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.62684 11.7496C9.04105 11.1638 9.04105 10.2141 9.62684 9.6283C10.2126 9.04252 11.1624 9.04252 11.7482 9.6283L18.9985 16.8786L26.2485 9.62851C26.8343 9.04273 27.7841 9.04273 28.3699 9.62851C28.9556 10.2143 28.9556 11.164 28.3699 11.7498L21.1198 18.9999L28.3699 26.25C28.9556 26.8358 28.9556 27.7855 28.3699 28.3713C27.7841 28.9571 26.8343 28.9571 26.2485 28.3713L18.9985 21.1212L11.7482 28.3715C11.1624 28.9573 10.2126 28.9573 9.62684 28.3715C9.04105 27.7857 9.04105 26.836 9.62684 26.2502L16.8771 18.9999L9.62684 11.7496Z"
                  fill=""
                />
              </svg>
            </span>
          </div>

          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
            Danger Alert!
          </h4>
          <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
           {error}
          </p>

          <div className="flex items-center justify-center w-full gap-3 mt-7">
            <button
              type="button"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-error-500 shadow-theme-xs hover:bg-error-600 sm:w-auto"
            
            onClick={errorModal.closeModal}
            >
              Okay, Got It
            </button>
          </div>
        </div>
      </Modal>

{/* Success Modal */}
      <Modal
        isOpen={successModal.isOpen}
        onClose={successModal.closeModal}
        className="max-w-[600px] p-5 lg:p-10"
      >
        <div className="text-center">
          <div className="relative flex items-center justify-center z-1 mb-7">
            <svg
              className="fill-success-50 dark:fill-success-500/15"
              width="90"
              height="90"
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z"
                fill=""
                fillOpacity=""
              />
            </svg>

            <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <svg
                className="fill-success-600 dark:fill-success-500"
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9375 19.0004C5.9375 11.7854 11.7864 5.93652 19.0014 5.93652C26.2164 5.93652 32.0653 11.7854 32.0653 19.0004C32.0653 26.2154 26.2164 32.0643 19.0014 32.0643C11.7864 32.0643 5.9375 26.2154 5.9375 19.0004ZM19.0014 2.93652C10.1296 2.93652 2.9375 10.1286 2.9375 19.0004C2.9375 27.8723 10.1296 35.0643 19.0014 35.0643C27.8733 35.0643 35.0653 27.8723 35.0653 19.0004C35.0653 10.1286 27.8733 2.93652 19.0014 2.93652ZM24.7855 17.0575C25.3713 16.4717 25.3713 15.522 24.7855 14.9362C24.1997 14.3504 23.25 14.3504 22.6642 14.9362L17.7177 19.8827L15.3387 17.5037C14.7529 16.9179 13.8031 16.9179 13.2173 17.5037C12.6316 18.0894 12.6316 19.0392 13.2173 19.625L16.657 23.0647C16.9383 23.346 17.3199 23.504 17.7177 23.504C18.1155 23.504 18.4971 23.346 18.7784 23.0647L24.7855 17.0575Z"
                  fill=""
                />
              </svg>
            </span>
          </div>
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90 sm:text-title-sm">
          {message}
          </h4>
          {/* <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
            {message}
          </p> */}

          <div className="flex items-center justify-center w-full gap-3 mt-7">
            <button
              type="button"
              className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white rounded-lg bg-success-500 shadow-theme-xs hover:bg-success-600 sm:w-auto"
             onClick={successModal.closeModal}
            >
              Okay, Got It
            </button>
          </div>
        </div>
      </Modal>

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

type UpdateUserPayload = Partial<Omit<User, "UserID">> & { UserID: number };

type UserFormProps = {
  initial: User | null;
   onSave: (payload: UpdateUserPayload) => void; // single argument
  onCancel: () => void;
};

function UserForm({ initial, onSave, onCancel }: UserFormProps) {
 

  const [error, setError] = useState<FormError>({});
  const [DataAreaIdrecords, setDataAreaIdRecords] = useState<any[]>([]);
  const [DataRolesrecords, setDataRolesRecords] = useState<any[]>([]);
  const [DataDepartmentrecords, setDataDepartmentRecords] = useState<any[]>([]);

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

            const res3 = await axios.get(`api/dynamics?type=departments`);
          setDataDepartmentRecords( res3.data.result.recordset);


     
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


const [form, setForm] = useState(() => ({
  name: initial?.Username || "",
  email: initial?.Email || "",
  password: initial?.RawPassword,
  site:  "",
  role:  initial?.RoleID || "",
  departmentId:initial?.departmentId || "",
  status: initial?.IsActive === true ? "1" : "0", // default when editing
  siteIds:  initial?.SiteIDs.split(',').map(Number)|| "",
 
}));


type FormError = {
  name?: boolean;
  email?: boolean;
  password?: boolean; 
  site?: boolean;
  role?: boolean;
  departmentId?: departmentId;
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


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
     

    
    const newError: FormError = {}; // type-safe
    if (!form.name.trim()) newError.name = true;
    if (!form.email.trim()) newError.email = true;
    if (!form.password.trim()) newError.password = true;
    if (selectedSites.length === 0) newError.site = true;
    if (!form.role) newError.role = true;
     if (!form.departmentId) newError.departmentId = true;

    if (!form.status) newError.status = true;

    setError(newError);

    if (Object.keys(newError).length > 0) return; // stop if error
  //  if (res.ok) alert("User created");


onSave({
  UserID: initial?.UserID!, // required
  Username: form.name,
  Email: form.email,
  Password: form.password,
  SiteIDs:  selectedSites.join(","),
  RoleID: form.role,
  DeptId: form.departmentId,
  IsActive: form.status  
});

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

          <label className="block text-sm font-medium mb-1">Sites</label>
              

           
  <div className={`flex flex-wrap items-center gap-4  ${
    error.site ? "border border-red-500 bg-red-50" : ""
  }`}>
            {DataAreaIdrecords?.map((option :any) => (
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

          </div>


          <div className="mt-5">
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
            key={"0"}
            name="departmentId"
            id="departmentId"
            value={form.departmentId}
            onChange={handleChange}

            className={`w-full border rounded px-3 py-2 ${
            error.departmentId ? "border-red-500" : "border-gray-300" }`} aria-label="Role"
          >
          <option value="" disabled>Select Department</option>
            {DataDepartmentrecords?.length > 0 ? (
              DataDepartmentrecords?.map((id) => (
                <option key={id.Id} value={id.Id}>
                  {id.DepartmentName}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>


          </div>


          <div className="mt-5">
            <label className="block text-sm font-medium mb-1">Status</label>
            <select  value={form.status}  name="status" onChange={handleChange } className={`w-full border rounded px-3 py-2 ${
            error.status ? "border-red-500" : "border-gray-300" }`} aria-label="Status">
              <option value=""  disabled>Select Status</option>
              <option value={1}>Active</option>
              {/* <option value="Pending">Pending</option> */}
              <option value={0}>Inactive</option>
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