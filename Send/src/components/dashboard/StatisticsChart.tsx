"use client";
import { useEffect, useRef, useState  } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import flatpickr from "flatpickr";
import DashboardChartTab from "../common/DashboardChartTab";
import { CalenderIcon } from "../../icons";
import MonthlyChart from "./MonthlyChart";
import ProductsChart from "./ProductsChart";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StatisticsChart() {
 const datePickerRef = useRef(null);

const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [error, setError] = useState("");
const formatDate = (date :any) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

useEffect(() => {
  if (!datePickerRef.current) return;

  const fp = flatpickr(datePickerRef.current, {
    mode: "range",
    static: true,
    monthSelectorType: "static",

    // backend format
    dateFormat: "Y-m-d",

    onChange: (selectedDates) => {
      if (selectedDates.length === 2) {
        const from = selectedDates[0];
        const to = selectedDates[1];

        // ✅ LOCAL DATE FORMAT (NO TIMEZONE ISSUE)
        const fromFormatted = flatpickr.formatDate(from, "Y-m-d");
        const toFormatted = flatpickr.formatDate(to, "Y-m-d");

        setFromDate(fromFormatted);
        setToDate(toFormatted);

        // ✅ BEAUTIFUL DISPLAY
        datePickerRef.current.value =
          `${formatDate(from)} → ${formatDate(to)}`;
      }
    },
  });

  return () => fp.destroy();
}, []);


 const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree"
  >("optionOne");

   const getButtonClass = (option: "optionOne" | "optionTwo" ) =>
    selected === option
      ? "shadow-theme-xs text-blue-900 dark:text-red bg-white dark:bg-blue-800"
      : "text-blue-500 dark:text-blue-400";

const [details, setDetails] = useState<any>(null);
const [loading, setLoading] = useState(false);

const loadData = async () => {

   try {

       setLoading(true);
       const res = await fetch(`/api/dashboard?fromdate=${fromDate}&toDate=${toDate}`);
       const result = await res.json();


    if (result.success ) {


                setDetails({
                    monthly: result.data.monthly,
                    products: result.data.products,

                });
       }


     } catch (err) {
       console.log(err);
     } finally {
       setLoading(false);
     }

}


useEffect(() => {
 setSelected("optionTwo")
  loadData();
}, []);

const handleSubmit = async() => {
 setSelected("optionOne")
  setError("");

  if (!fromDate || !toDate) {
    setError("Please select From and To date");
    return;
  }
  loadData();
 // console.log("API CALL", fromDate, toDate);
};


const handleSubmitMontly = async() => {
setSelected("optionTwo")
 setError("");
setFromDate("")
setToDate("")
datePickerRef.current.value=null;

  loadData();

 // console.log("API CALL", fromDate, toDate);
};



  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">

{error && (
  <p className="mr-[276px] text-right text-sm text-red-500 font-medium">
    {error}
  </p>
)}


      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">

          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Monthly and Products
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Wise Complaints
          </p>
        </div>

 <div className="flex items-center gap-3 sm:justify-end">

  <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">

<div className="relative inline-flex items-center w-full lg:w-auto">

  <CalenderIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none z-10" />

  <input
    ref={datePickerRef}
    type="text"
    readOnly
    className="h-10 w-full lg:w-80 pl-10 pr-3 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 cursor-pointer"
    placeholder="Select date range"
  />

</div>


            <button

        onClick={handleSubmit}

        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-blue-900   dark:hover:text-blue ${getButtonClass(
          "optionOne"
        )}`}
      >
         Filter
      </button>
         <button

           onClick={handleSubmitMontly}

        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-blue-900   dark:hover:text-blue ${getButtonClass(
          "optionTwo"
        )}`}
      >
        Current Year({new Date().getFullYear()})
      </button>

   </div>

   </div>




      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">

{
  (!details?.monthly?.length > 0 && !details?.products?.length> 0) ? (
    <div className="text-center text-gray-500 py-10">
      No Data Found
    </div>
  ) : (
    <div className="min-w-[1000px] xl:min-w-full space-y-6">

      {details?.monthly?.length > 0 && (
        <MonthlyChart data={details?.monthly} />
      )}

      {details?.products?.length> 0 && (
        <ProductsChart data={details?.products} />
      )}

    </div>
  )
}





      </div>
    </div>
  );
}