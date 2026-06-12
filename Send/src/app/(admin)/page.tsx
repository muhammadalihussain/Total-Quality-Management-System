import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TQMS Dashboard",
  description: "Total Quality Management System (TQMS)",
};

export default function Dashboard() {
  return (
    <div className="space-y-6">

 <div className="relative overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-10 text-black shadow-xl">

  {/* soft glow */}
  <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl"></div>
  <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-indigo-300/30 blur-3xl"></div>

  {/* content */}
  <div className="relative z-10">

    <h1 className="text-5xl font-bold from-sky-500 text-slate-900">
      Welcome to TQMS
    </h1>

    {/* underline accent */}
    <div className="mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-sky-500 to-blue-600"></div>

    <p className="mt-4 text-lg font-medium text-blue-700">
      Total Quality Management System
    </p>


  </div>
</div>


     {/* Mission Section */}
<div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 shadow-lg transition-all hover:shadow-xl">

  {/* Accent top line */}
  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400"></div>

  {/* Soft background glow */}
  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/60 blur-3xl"></div>
  <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-100/60 blur-3xl"></div>

  <div className="relative z-10">

    <h2 className="text-3xl font-bold tracking-tight text-slate-800">
      Excellence Through Quality
    </h2>

    <div className="mt-2 h-1 w-20 rounded-full bg-blue-600"></div>

    <p className="mt-6 text-lg leading-8 text-slate-600">
      TQMS provides a centralized platform for managing
      <span className="font-semibold text-slate-800"> Corrective & Preventive Actions (CAPA)</span>,
      Root Cause Analysis, Complaints, Risk Assessments,
      Training Records, Document Control, and Continuous Improvement initiatives.
    </p>

  </div>
</div>

      {/* Quick Access */}
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

  {/* CAPA */}
  <button className="rounded-2xl border-l-4 border-red-500 bg-red-50 p-6 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
    <h3 className="font-bold text-red-700 text-lg">
      CAPA Management
    </h3>
    <p className="mt-2 text-red-600">
      Track corrective and preventive actions
    </p>
  </button>

  {/* Audit */}
  <button className="rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
    <h3 className="font-bold text-blue-700 text-lg">
      COA Management
    </h3>
    <p className="mt-2 text-blue-600">
     Certification of Analysis
    </p>
  </button>

  {/* Document */}
  <button className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 p-6 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
    <h3 className="font-bold text-emerald-700 text-lg">
     Root Cause Analysis
    </h3>
    <p className="mt-2 text-emerald-600">
      SOPs, policies and procedures
    </p>
  </button>

  {/* Reports */}
  <button className="rounded-2xl border-l-4 border-purple-500 bg-purple-50 p-6 text-left shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
    <h3 className="font-bold text-purple-700 text-lg">
      Quality Reports
    </h3>
    <p className="mt-2 text-purple-600">
      Analytics and performance trends
    </p>
  </button>

</div>
      </div>


  );
}