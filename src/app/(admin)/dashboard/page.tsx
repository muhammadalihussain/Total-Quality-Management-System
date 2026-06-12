import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/dashboard/MonthlyTarget";
import MonthlyChart from "@/components/dashboard/MonthlyChart";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import MonthlyData from "@/components/dashboard/MonthlyData";
import DemographicCard from "@/components/dashboard/DemographicCard";


export const metadata: Metadata = {
  title:
    "Dashboard TQMS ",
     description: "Total Quality Management System (TQMS) software",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12">
        <StatisticsChart />
      </div>



    </div>
  );
}




/*
export const metadata: Metadata = {
  title:
    "Dashboard TQMS ",
     description: "Total Quality Management System (TQMS) software",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
*/