// app/components/CreateCAPAModal.tsx
/*
'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

import ComponentCard from "../common/ComponentCard";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import Label from "../form/Label";
import Input from "../form/input/InputField";



interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


const CreateCAPAModal: React.FC<CreateCAPAModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}: Props) => {
 if (!isOpen) return null;


  const [formData, setFormData] = useState({
    CAPAID: `CAPA-${Date.now()}`,
    Title: '',
    Description: '',
    CreatedBy: 1,
    CreatedByName: 'Ali',
    Department: 'Production'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/capa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to create CAPA');

      onSuccess();

    } catch (error) {
      toast.error('Failed to create CAPA');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
 <ComponentCard title="Create CAPA">
       <Modal
          isOpen={isOpen}
          onClose={onClose}
          className="max-w-[600px] p-5 lg:p-10"
        >


        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
          <h2 className="text-xl font-semibold">Create New CAPA</h2>

        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CAPA ID
            </label>
            <input
              type="text"
              value={formData.CAPAID}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.Title}
              onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CAPA title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              value={formData.Description}
              onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CAPA description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              value={formData.Department}
              onChange={(e) => setFormData({ ...formData, Department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Production">Production</option>
              <option value="Quality">Quality</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create CAPA'}
            </button>
          </div>
        </form>
         </Modal>
      </ComponentCard>
        </div>
  );
};

export default CreateCAPAModal;