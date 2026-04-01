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



export default function ProdcutsPage() {

 const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [showDelete, setShowDelete] = useState(false);
  const initialQ = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [q, setQ] = useState(initialQ);          // controlled input
  const [page, setPage] = useState(initialPage); // current page state
 
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [Products, setProducts] = useState([]);
 
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
 const [formKey, setFormKey] = useState(0);


   const successModal = useModal();
    const infoModal = useModal();
    const warningModal = useModal();
    const errorModal = useModal();

const refreshGrid = () => setFormKey(prev => prev + 1);
// Debounce typing
  const [debouncedQ, setDebouncedQ] = useState(q);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQ(q), 500); // 500ms debounce
    return () => clearTimeout(handler);
  }, [q]);

 // Fetch Products
  const fetchProductsData = async () => {
    setLoading(true);
    const res = await fetch(`/api/products?q=${q}&page=${page}`);
    const data = await res.json();
    
    setProducts(data.records);
    setCount(data.filtered);
    setLoading(false);
  };


  // Fetch Products when page or debounced query changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const res = await fetch(`/api/products?q=${debouncedQ}&page=${page}`);
      const data = await res.json();
    
      setProducts(data.records);
      setCount(data.filtered);

      setLoading(false);
    };

    fetchProducts();
  }, [debouncedQ, page,formKey]);


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


  const handleDelete = (u: any) => {

    setSelectedProduct(u);
    setShowDelete(true);
  };

  const handleDeleteConfirm = async (id: number) => {
   
  try {
/*
 await fetch(`/api/products/${id}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})

*/


 const res = await axios.delete(`/api/products/${id}`);



if(res.data.success){

      setError("");
    }else{


    setError(res.data.message);
     errorModal.openModal();

    }

 } catch (err:any) {
    setError(err.response?.data?.message || "Something went wrong");
    errorModal.openModal();
  }


  setShowDelete(false);

  // refresh data
  fetchProductsData();
};



  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/*  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">U</div> */}
          <h1 className="text-2xl font-semibold">Products</h1>
        </div>

        <div className="flex items-center gap-3">
             {/* Search Form */}
      
          <input
            type="text"
            placeholder="Search by name, email ,category "
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            className="px-3 py-2 border rounded-md text-sm w-72"
            aria-label="Search Products"
          />

          <ProductInsertCard  refreshGrid ={refreshGrid}   />
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ProductCode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ProductName</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {Products?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-6 text-center text-sm text-gray-500">No Products found.</td>
                </tr>
              ) : (
                Products?.map((u :any) => (
                  <tr key={u.Id} className="hover:bg-gray-50">
{ /*
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium">{u.ProductCode.charAt(0)}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{u.ProductCode}</div>
                        </div>
                      </div>
                    </td>
                    */}
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 ">{u.ProductCode  }</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 ">{u.ProductName  }</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 ">{u.CategoryName  }</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${u.IsActive === true ? "bg-green-100 text-green-800" : ""}  ${u.IsActive !==true? "bg-gray-100 text-gray-700" : ""}`}>{u.IsActive===true?"Active":"InActive"}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  <a
    href={`/products/${u.Id}`}
    className="inline-flex items-center p-1 rounded hover:bg-gray-100 text-blue-600"
    title="View"
    
  >
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
      />
    </svg>
  </a>              <button onClick={() => handleDelete(u)} className="inline-flex items-center p-1 rounded hover:bg-gray-100 text-red-600" title="Delete" aria-label={`Delete ${u.Produtname}`}>
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
</div>

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
        Delete Product {selectedProduct.ProductName}
      </h2>

      {/* Message */}
      <p className="text-gray-500 text-center mt-2">
        Are you sure you want to delete
        <span className="font-semibold text-red-600">
          {" "} { }
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
          onClick={() => handleDeleteConfirm(selectedProduct.Id)}
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
             Alert!
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


</>

)}
    </main>
  );
}

