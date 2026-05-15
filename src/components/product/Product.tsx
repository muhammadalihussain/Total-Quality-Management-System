"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import ProductInsertCard from "@/components/product/ProductInsertCard";
import {
  Eye,
  Trash2,
  Search,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

  const { isOpen, openModal, closeModal } = useModal();
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
      const res = await fetch(
        `/api/products?q=${debouncedQ}&page=${page}`
      );

      const data = await res.json();

      setProducts(data.records || []);
      setCount(data.filtered || 0);
    } catch (err) {
      setError("Failed to load products");
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
  // VIEW
  //-----------------------------------
  const handleView = (id: number) => {
    setSelectedId(id);
    openModal();
  };

  //-----------------------------------
  // RENDER
  //-----------------------------------
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">
            Product Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your products, categories and inventory.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-80"
            />
          </div>

          {/* ADD BUTTON */}
          <div className="rounded-xl shadow-sm">
            <ProductInsertCard
              refreshGrid={() => setFormKey((p) => p + 1)}
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Package className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {count}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <Package className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Active Products</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {products.filter((x) => x.IsActive).length}
              </h2>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-red-100 p-3 text-red-600">
              <Package className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Inactive Products</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {products.filter((x) => !x.IsActive).length}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <ComponentCard title="">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    Code
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    Product Name
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex items-center justify-center py-20">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <Package className="mb-4 h-14 w-14 text-gray-300" />

                        <h3 className="text-lg font-semibold text-gray-700">
                          No Products Found
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Try searching with another keyword.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((u, index) => (
                    <tr
                      key={u.Id}
                      className="transition-all duration-200 hover:bg-blue-50/40"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">
                          {u.ProductCode}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">
                          {u.ProductName}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {u.CategoryName}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            u.IsActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {u.IsActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {/* VIEW */}
                          <button
                            onClick={() => handleView(u.Id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition-all hover:scale-105 hover:bg-blue-100"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(u)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 transition-all hover:scale-105 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
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
          {!loading && totalPages > 1 && (
            <div className="flex flex-col gap-4 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Showing page{" "}
                <span className="font-semibold text-gray-700">
                  {page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                {/* PREV */}
                <button
                  onClick={() => changePage(page - 1)}
                  disabled={page === 1}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                {/* PAGE NUMBERS */}
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => changePage(p)}
                    className={`h-10 w-10 rounded-lg text-sm font-semibold transition-all ${
                      page === p
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                {/* NEXT */}
                <button
                  onClick={() => changePage(page + 1)}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </ComponentCard>

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-red-100 p-3">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Delete Product
                </h2>

                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4">
              <p className="text-sm text-gray-700">
                Are you sure you want to delete:
              </p>

              <h3 className="mt-1 font-semibold text-red-700">
                {selectedProduct?.ProductName}
              </h3>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleDeleteConfirm(selectedProduct.Id)
                }
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-red-700"
              >
                Delete Product
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
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="h-7 w-7 text-red-600" />
          </div>

          <h3 className="text-xl font-bold text-red-600">
            Something went wrong
          </h3>

          <p className="mt-2 text-gray-600">{error}</p>

          <button
            onClick={errorModal.closeModal}
            className="mt-6 rounded-xl bg-red-600 px-5 py-2.5 text-white transition-all hover:bg-red-700"
          >
            Close
          </button>
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