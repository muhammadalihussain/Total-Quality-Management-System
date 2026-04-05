// app/components/CAPADetailsModal.tsx


/*

'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, AlertCircle, User, Calendar, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface CAPADetailsModalProps {
  capaId: string;
  onClose: () => void;
}

interface RootCause {
  RootCauseID: string;
  RootCauseTitle: string;
  RootCauseDetails: string;
  ActionID: string;
  CorrectiveAction: string;
  PreventiveAction: string;
  AssignedToName: string;
}

interface Assignment {
  AssignmentID: string;
  RootCauseID: string;
  AssignedToName: string;
  ActionTaken: boolean;
  IsEffective: boolean;
  Remarks: string;
  CompletedAt: string;
}

interface COA {
  COAID: string;
  COA_Status: string;
  Result: string;
  PreparedByName: string;
  CheckedByName: string;
  ApprovedByName: string;
}

const CAPADetailsModal: React.FC<CAPADetailsModalProps> = ({ capaId, onClose }) => {
  const [capaData, setCapaData] = useState<any>(null);
  const [rootCauses, setRootCauses] = useState<RootCause[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [coa, setCoa] = useState<COA | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCAPADetails();
  }, [capaId]);

  const fetchCAPADetails = async () => {
    try {
      const response = await fetch(`/api/capa/${capaId}`);
      const data = await response.json();

      setCapaData(data[0]?.[0]);
      setRootCauses(data[1] || []);
      setAssignments(data[2] || []);
      setCoa(data[3]?.[0] || null);
    } catch (error) {
      toast.error('Failed to fetch CAPA details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRootCause = async () => {
    const title = prompt('Enter root cause title:');
    const details = prompt('Enter root cause details:');

    if (title && details) {
      try {
        const response = await fetch('/api/rootcause', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            RootCauseID: `RC-${Date.now()}`,
            CAPAID: capaId,
            RootCauseTitle: title,
            RootCauseDetails: details,
            CreatedBy: 101,
            CreatedByName: 'Rahul Sharma'
          })
        });

        if (response.ok) {
          toast.success('Root cause added successfully');
          fetchCAPADetails();
        }
      } catch (error) {
        toast.error('Failed to add root cause');
      }
    }
  };

  const handleAddActions = async (rootCauseId: string) => {
    const corrective = prompt('Enter corrective action:');
    const preventive = prompt('Enter preventive action:');
    const assignedTo = prompt('Enter assigned user ID (102-Sanjay, 103-Priya):');

    if (corrective && preventive && assignedTo) {
      const userNames: { [key: string]: string } = {
        '102': 'Sanjay',
        '103': 'Priya'
      };

      try {
        const response = await fetch('/api/actions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ActionID: `A-${Date.now()}`,
            RootCauseID: rootCauseId,
            CorrectiveAction: corrective,
            PreventiveAction: preventive,
            AssignedTo: parseInt(assignedTo),
            AssignedToName: userNames[assignedTo] || 'User'
          })
        });

        if (response.ok) {
          toast.success('Actions added successfully');
          fetchCAPADetails();
        }
      } catch (error) {
        toast.error('Failed to add actions');
      }
    }
  };

  const handleAssignUser = async (rootCauseId: string) => {
    const userId = prompt('Enter user ID to assign (102-Sanjay, 103-Priya):');

    if (userId) {
      const userNames: { [key: string]: string } = {
        '102': 'Sanjay',
        '103': 'Priya'
      };

      try {
        const response = await fetch('/api/assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            AssignmentID: `AS-${Date.now()}`,
            CAPAID: capaId,
            RootCauseID: rootCauseId,
            AssignedTo: parseInt(userId),
            AssignedToName: userNames[userId] || 'User',
            AssignedBy: 201,
            AssignedByName: 'Amit Verma'
          })
        });

        if (response.ok) {
          toast.success('User assigned successfully');
          fetchCAPADetails();
        }
      } catch (error) {
        toast.error('Failed to assign user');
      }
    }
  };

  const handleCompleteAction = async (assignmentId: string) => {
    const remarks = prompt('Enter completion remarks:');

    if (remarks) {
      try {
        const response = await fetch('/api/assignments', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            AssignmentID: assignmentId,
            ActionTaken: true,
            Remarks: remarks
          })
        });

        if (response.ok) {
          toast.success('Action completed successfully');
          fetchCAPADetails();
        }
      } catch (error) {
        toast.error('Failed to complete action');
      }
    }
  };

  const handleMarkEffectiveness = async (assignmentId: string) => {
    const isEffective = confirm('Is the action effective? Click OK for Yes, Cancel for No');
    const remarks = prompt('Enter effectiveness remarks:');

    if (remarks) {
      try {
        const response = await fetch('/api/effectiveness', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            AssignmentID: assignmentId,
            IsEffective: isEffective,
            Remarks: remarks
          })
        });

        if (response.ok) {
          toast.success('Effectiveness marked successfully');
          fetchCAPADetails();
        }
      } catch (error) {
        toast.error('Failed to mark effectiveness');
      }
    }
  };

  const handleCreateCOA = async () => {
    try {
      const response = await fetch('/api/coa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          COAID: `COA-${Date.now()}`,
          CAPAID: capaId,
          PreparedBy: 301,
          PreparedByName: 'Neha Singh'
        })
      });

      if (response.ok) {
        toast.success('COA created successfully');
        fetchCAPADetails();
      }
    } catch (error) {
      toast.error('Failed to create COA');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center
bg-gradient-to-br from-black/70 via-black/60 to-black/80
backdrop-blur-md backdrop-saturate-150 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold">{capaData?.Title}</h2>
            <p className="text-gray-600 mt-1">CAPA ID: {capaData?.CAPAID}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="border-b">
          <div className="flex gap-4 px-6">
            {['overview', 'root-causes', 'assignments', 'coa'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 capitalize font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Description</h3>
                <p>{capaData?.Description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Created By</h3>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span>{capaData?.CreatedByName}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Department</h3>
                  <span>{capaData?.Department}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Created Date</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span>{new Date(capaData?.CreatedAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Status</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    capaData?.Status === 'OPEN' ? 'bg-yellow-100 text-yellow-800' :
                    capaData?.Status === 'CLOSED' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {capaData?.Status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'root-causes' && (
            <div className="space-y-4">
              <button
                onClick={handleAddRootCause}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Add Root Cause
              </button>

              {rootCauses.map((rc) => (
                <div key={rc.RootCauseID} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{rc.RootCauseTitle}</h4>
                      <p className="text-gray-600 mt-1">{rc.RootCauseDetails}</p>
                    </div>
                    {!rc.ActionID && (
                      <button
                        onClick={() => handleAddActions(rc.RootCauseID)}
                        className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
                      >
                        Add Actions
                      </button>
                    )}
                  </div>

                  {rc.ActionID && (
                    <div className="mt-3 space-y-2">
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="font-medium">Corrective Action:</p>
                        <p>{rc.CorrectiveAction}</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="font-medium">Preventive Action:</p>
                        <p>{rc.PreventiveAction}</p>
                      </div>
                      {rc.AssignedToName && (
                        <p className="text-sm text-gray-600">Assigned to: {rc.AssignedToName}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-4">
              {rootCauses.map((rc) => {
                const assignment = assignments.find(a => a.RootCauseID === rc.RootCauseID);
                return (
                  <div key={rc.RootCauseID} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{rc.RootCauseTitle}</h4>

                    {!assignment && rc.ActionID && (
                      <button
                        onClick={() => handleAssignUser(rc.RootCauseID)}
                        className="mt-2 px-3 py-1 bg-purple-600 text-white rounded-md text-sm"
                      >
                        Assign User
                      </button>
                    )}

                    {assignment && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-600" />
                          <span>Assigned to: {assignment.AssignedToName}</span>
                        </div>

                        {!assignment.ActionTaken && (
                          <button
                            onClick={() => handleCompleteAction(assignment.AssignmentID)}
                            className="px-3 py-1 bg-green-600 text-white rounded-md text-sm"
                          >
                            Complete Action
                          </button>
                        )}

                        {assignment.ActionTaken && !assignment.IsEffective && (
                          <button
                            onClick={() => handleMarkEffectiveness(assignment.AssignmentID)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                          >
                            Mark Effectiveness
                          </button>
                        )}

                        {assignment.ActionTaken && (
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="font-medium">Action Status:</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="flex items-center gap-1">
                                {assignment.ActionTaken ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Clock className="w-4 h-4 text-yellow-600" />}
                                Action Taken: {assignment.ActionTaken ? 'Yes' : 'No'}
                              </span>
                              {assignment.IsEffective && (
                                <span className="flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  Effective
                                </span>
                              )}
                            </div>
                            {assignment.Remarks && (
                              <p className="mt-2 text-gray-600">Remarks: {assignment.Remarks}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'coa' && (
            <div className="space-y-4">
              {!coa && capaData?.Status === 'READY_FOR_COA' && (
                <button
                  onClick={handleCreateCOA}
                  className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Create COA
                </button>
              )}

              {coa && (
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Certificate of Analysis</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">COA ID</p>
                        <p className="font-medium">{coa.COAID}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status</p>
                        <p className={`font-medium ${
                          coa.COA_Status === 'APPROVED' ? 'text-green-600' : 'text-yellow-600'
                        }`}>{coa.COA_Status}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Prepared By</p>
                        <p>{coa.PreparedByName}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Result</p>
                        <p className={`font-bold ${
                          coa.Result === 'PASS' ? 'text-green-600' : 'text-red-600'
                        }`}>{coa.Result || 'Pending'}</p>
                      </div>
                      {coa.CheckedByName && (
                        <div>
                          <p className="text-gray-600">Checked By</p>
                          <p>{coa.CheckedByName}</p>
                        </div>
                      )}
                      {coa.ApprovedByName && (
                        <div>
                          <p className="text-gray-600">Approved By</p>
                          <p>{coa.ApprovedByName}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CAPADetailsModal;