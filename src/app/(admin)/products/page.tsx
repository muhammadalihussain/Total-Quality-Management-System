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
import ProductInsertCard from "@/components/product/ProductInsertCard";



export default function UsersPage() {


    const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [q, setQ] = useState(initialQ);          // controlled input
  const [page, setPage] = useState(initialPage); // current page state
 
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

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
    const res = await fetch(`/api/products?q=${q}&page=${page}`);
    const data = await res.json();
    
    setUsers(data.records);
    setCount(data.filtered);
    setLoading(false);
  };


  // Fetch users when page or debounced query changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      const res = await fetch(`/api/products?q=${debouncedQ}&page=${page}`);
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



  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">U</div>
          <h1 className="text-2xl font-semibold">Products</h1>
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

          <ProductInsertCard editData={editing}   />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
    <div className="space-y-6">
   <ComponentCard title="Product Management">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ProductName</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ProductCode</th>

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
                  <tr key={u.Id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium">{u.ProductName.charAt(0)}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{u.ProductName}</div>
                          
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 ">{u.ProductCode}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${u.IsActive === true ? "bg-green-100 text-green-800" : ""}  ${u.IsActive !==true? "bg-gray-100 text-gray-700" : ""}`}>{u.IsActive===true?"Active":"InActive"}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <a
  href={`/products/${u.Id}`}
  className="px-2 py-1 bg-blue-600 text-white rounded"
>
  View
</a>
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
</div></>

)}









      


    </main>
  );
}

