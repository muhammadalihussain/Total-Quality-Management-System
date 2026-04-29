"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import ProductInsertCard from "@/components/product/ProductInsertCard";
import { Eye } from "lucide-react";
import FullScreenModalProductDetails from "@/components/product/FullScreenModalProductDetails";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";

export default function ProductsPage() {
  //-----------------------------------
  // STATE
  //-----------------------------------
  const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") || "";
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [q, setQ] = useState(initialQ);
  const [page, setPage] = useState(initialPage);
  const [debouncedQ, setDebouncedQ] = useState(q);

  const [products, setProducts] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDelete, setShowDelete] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const { isOpen, openModal, closeModal } = useModal(); // ✅ ONLY modal control
  const errorModal = useModal();

  const [formKey, setFormKey] = useState(0);

  //-----------------------------------
  // DEBOUNCE SEARCH
  //-----------------------------------
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQ(q), 500);
    return () => clearTimeout(handler);
  }, [q]);

  //-----------------------------------
  // FETCH DATA
  //-----------------------------------
  const fetchProductsData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?q=${debouncedQ}&page=${page}`);
      const data = await res.json();

      setProducts(data.records || []);
      setCount(data.filtered || 0);
    } catch (err) {
      setError("Failed to load data");
      errorModal.openModal();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductsData();
  }, [debouncedQ, page, formKey]);

  //-----------------------------------
  // PAGINATION
  //-----------------------------------
  const totalPages = Math.ceil(count / 10);

  const changePage = (p: number) => {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    setPage(p);
  };

  //-----------------------------------
  // DELETE
  //-----------------------------------
  const handleDelete = (u: any) => {
    setSelectedProduct(u);
    setShowDelete(true);
  };

  const handleDeleteConfirm = async (id: number) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);

      if (!res.data.success) {
        setError(res.data.message);
        errorModal.openModal();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Delete failed");
      errorModal.openModal();
    }

    setShowDelete(false);
    fetchProductsData();
  };

  //-----------------------------------
  // OPEN MODAL (IMPORTANT)
  //-----------------------------------
  const handleView = (id: number) => {
    setSelectedId(id);
    openModal(); // ✅ THIS OPENS MODAL
  };

  //-----------------------------------
  // RENDER
  //-----------------------------------
  return (
    <main className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 border rounded-md text-sm w-72"
          />

          <ProductInsertCard refreshGrid={() => setFormKey((p) => p + 1)} />
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ComponentCard title="">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs">Code</th>
                  <th className="px-6 py-3 text-left text-xs">Name</th>
                  <th className="px-6 py-3 text-left text-xs">Category</th>
                  <th className="px-6 py-3 text-left text-xs">Status</th>
                  <th className="px-6 py-3 text-right text-xs">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6">
                      No Products
                    </td>
                  </tr>
                ) : (
                  products.map((u) => (
                    <tr key={u.Id}>
                      <td className="px-6 py-4">{u.ProductCode}</td>
                      <td className="px-6 py-4">{u.ProductName}</td>
                      <td className="px-6 py-4">{u.CategoryName}</td>

                      <td className="px-6 py-4">
                        {u.IsActive ? "Active" : "Inactive"}
                      </td>

                      <td className="px-6 py-4 text-right">
                       <div className="flex justify-end items-center gap-2">
  <button
    onClick={() => handleView(u.Id)}
    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
  >
    <Eye className="w-4 h-4" />
  </button>

  <button onClick={() => handleDelete(u)} className="inline-flex items-center p-1 rounded hover:bg-gray-100 text-red-600" title="Delete" aria-label={`Delete ${u.Username}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex gap-2 mt-4">
            <button onClick={() => changePage(page - 1)}>Prev</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => changePage(p)}>
                {p}
              </button>
            ))}

            <button onClick={() => changePage(page + 1)}>Next</button>
          </div>
        </ComponentCard>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-lg font-semibold">
              Delete {selectedProduct?.ProductName}
            </h2>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowDelete(false)}>Cancel</button>

              <button
                onClick={() => handleDeleteConfirm(selectedProduct.Id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR MODAL */}
      <Modal
        isOpen={errorModal.isOpen}
        onClose={errorModal.closeModal}
      >
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-red-600">Error</h3>
          <p>{error}</p>
        </div>
      </Modal>

      {/* PRODUCT DETAILS MODAL */}
      <FullScreenModalProductDetails
        isOpen={isOpen}
        Id={selectedId}
        onClose={closeModal}
      />
    </main>
  );
}