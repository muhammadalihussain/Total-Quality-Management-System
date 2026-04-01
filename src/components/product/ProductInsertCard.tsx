"use client";
import { useModal } from "@/hooks/useModal";
import ComponentCard from "../common/ComponentCard";
import { useState,useEffect  } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import axios from 'axios';




export default function ProductInsertCard({ refreshGrid  }: any) {


  const {
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal,
  } = useModal();
const [dataCategoriesRecords, setDataCategoriesRecords] = useState<any[]>([]);
const [dataFormsRecords, setDataFormsRecords] = useState<any[]>([]);
const [dataColorsRecords, setDataColorsRecords] = useState<any[]>([]);

  useEffect(() => {
  async function fetchData() {
    try {
         const res1 = await axios.get(`/api/dynamics?type=categories`);
         setDataCategoriesRecords( res1.data.result.recordset);

           const res2 = await axios.get(`/api/dynamics?type=colors`);
           setDataColorsRecords( res2.data.result.recordset);


          const res3 = await axios.get(`/api/dynamics?type=forms`);
          setDataFormsRecords( res3.data.result.recordset);


    } catch (err :any) {
     alert(err.response?.data?.message );
    }
  }
  fetchData();
}, []);


    const successModal = useModal();
    const infoModal = useModal();
    const warningModal = useModal();
    const errorModal = useModal();

 const [error, setError] = useState<FormError>({});
 const [showDelete, setShowDelete] = useState(false);
 const [message, setMessage] = useState('');

const initialForm = {
  ProductName: "",
  ProductCode: "",
  CategoryID: "",
  FormID: "",
  ColorID: "",
  CountryOfOrigin: "",
  Ingredients: "",
  IngredientsDeclaration: "",
  SuitableFor: "",
  Additives: "",
  Functionalities: "",
  Description: "",
  ShelfLife: "",
  StorageConditions: "",
  Uses: "",
  IsActive: true,
};


const [form, setForm] = useState(initialForm);

type FormError = {
      ProductName?: boolean;
      ProductCode?: boolean;
      CategoryID?: boolean;
      FormID?: boolean;
      ColorID?: boolean;
      CountryOfOrigin?: boolean;
      Ingredients?: boolean;
      IngredientsDeclaration?: boolean;
      SuitableFor?: boolean;
      Additives?: boolean;
      Functionalities?: boolean;
      Description?: boolean;
      ShelfLife?: boolean;
      StorageConditions?: boolean;
      Uses?: boolean;
      IsActive?: boolean;
};


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    setForm((prev) => ({
    ...prev,
    [name]: name === "IsActive" ? value === "1" : value,
  }));
  };


  const submit = async (e: React.FormEvent) => {
    e.preventDefault();


    const newError: FormError = {}; // type-safe
    if (!form.ProductName.trim()) newError.ProductName = true;
    if (!form.ProductCode.trim()) newError.ProductCode = true;
     if (!form.CategoryID) newError.CategoryID = true;
    if (!form.FormID) newError.FormID = true;
        if (!form.ColorID) newError.ColorID = true;
     if (!form.Ingredients.trim()) newError.Ingredients = true;
     if (!form.IngredientsDeclaration.trim()) newError.IngredientsDeclaration = true;
     if (!form.SuitableFor.trim()) newError.SuitableFor = true;
      if (!form.Additives.trim()) newError.Additives = true;
    if (!form.Functionalities.trim()) newError.Functionalities = true;
     if (!form.Description.trim()) newError.Description = true;
  if (!form.ShelfLife.trim()) newError.ShelfLife = true;
 if (!form.StorageConditions.trim()) newError.StorageConditions = true;

    if (!form.IsActive) newError.IsActive = true;
    setError(newError);


    if (Object.keys(newError).length > 0) return; // stop if error
     //if (res.ok) alert("User created");


  try{


  await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        ProductName: form.ProductName,
        ProductCode: form.ProductCode,
        CategoryID: form.CategoryID,
        FormID: form.FormID,
        ColorID: form.ColorID,
        Ingredients: form.Ingredients,

IngredientsDeclaration: form.IngredientsDeclaration,
SuitableFor: form.SuitableFor,
Additives: form.Additives,
Functionalities: form.Functionalities,
Description: form.Description,
ShelfLife: form.ShelfLife,
StorageConditions: form.StorageConditions,
Uses:form.Uses,
IsActive: form.IsActive,

      }),
    });

   closeFullscreenModal()
   setForm(initialForm); // reset
   refreshGrid();   // clear edit state (parent)


 } catch (err:any) {

    setError(err.response?.data?.message || "Something went wrong");
    errorModal.openModal();
  }

  };


/*
  useEffect(() => {
    if (editData) {
      setForm({ ...initialState, ...editData });
    } else {
      setForm(initialState);
    }
  }, [editData]);

  */


const handleAdd = () => {
setForm(initialForm);
openFullscreenModal()

};



  return (
    <>
      <Button size="sm" onClick={handleAdd }>
     <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/></svg>
            Add Product
      </Button>
      <Modal
        isOpen={isFullscreenModalOpen}
        onClose={closeFullscreenModal}
        isFullscreen={true}
        showCloseButton={true}
      >


    <div className="fixed inset-0 flex flex-col justify-between p-6 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 lg:p-10fixed top-0 left-0 flex flex-col justify-between w-full h-screen p-6 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 lg:p-10">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-[95%] p-5 max-h-[95vh] overflow-y-auto animate-scaleIn">

   <form className="flex flex-col" onSubmit={submit}>

      {/* HEADER */}
      <h5 className="mb-4 text-lg font-medium text-gray-800 dark:text-white/90">
        Add Product
      </h5>

      {/* GRID */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div>
          <Label>Product Name</Label>
          <Input type="text"  name="ProductName" placeholder="" onChange={handleChange} value={form.ProductName}
          className={`w-full border rounded px-3 py-2 ${
            error.ProductName ? "border-red-500" : "border-gray-300" }`} aria-label="Product name"
          />
        </div>

        <div>
          <Label>Product Code</Label>
          <Input type="text" name="ProductCode" placeholder="" onChange={handleChange} value={form.ProductCode}
           className={`w-full border rounded px-3 py-2 ${
            error.ProductCode ? "border-red-500" : "border-gray-300" }`} aria-label="ProductCode"
          />
        </div>

        <div>
          <Label>Category</Label>


           <select
            key={"0"}
            name="CategoryID"
            id="CategoryID"
            value={form.CategoryID}
            onChange={handleChange}

            className={`w-full border rounded px-3 py-2 ${
            error.CategoryID ? "border-red-500" : "border-gray-300" }`} aria-label="Role"
          >
          <option value="" disabled>Select Category</option>
            {dataCategoriesRecords?.length > 0 ? (
              dataCategoriesRecords.map((id) => (
                <option key={id.Id} value={id.Id}>
                  {id.Name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>


        </div>

         <div>
          <Label>Form</Label>



            <select
            key={"0"}
            name="FormID"
            id="FormID"
            value={form.FormID}
            onChange={handleChange}

            className={`w-full border rounded px-3 py-2 ${
            error.FormID ? "border-red-500" : "border-gray-300" }`} aria-label="Form" >

          <option value="" disabled>Select Form</option>
            {dataFormsRecords?.length > 0 ? (
              dataFormsRecords.map((id) => (
                <option key={id.Id} value={id.Id}>
                  {id.Name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>




        </div>


            <div>
          <Label>Color</Label>

           <select
            key={"0"}
            name="ColorID"
            id="ColorID"
            value={form.ColorID}
            onChange={handleChange}

            className={`w-full border rounded px-3 py-2 ${
            error.ColorID ? "border-red-500" : "border-gray-300" }`} aria-label="ColorID" >

          <option value="" disabled>Select Color</option>
            {dataColorsRecords?.length > 0 ? (
              dataColorsRecords.map((id) => (
                <option key={id.Id} value={id.Id}>
                  {id.Name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>

        </div>


          <div>
          <Label>Country Of Origin</Label>
          <Input name="CountryOfOrigin" placeholder="" onChange={handleChange} value={form.CountryOfOrigin}

          className={`w-full border rounded px-3 py-2`} aria-label="CountryOfOrigin"
          />
        </div>


          <div>
          <Label>Ingredients</Label>
          <input name="Ingredients" placeholder="" onChange={handleChange} value={form.Ingredients}

          className={`w-full border rounded px-3 py-2 ${
            error.Ingredients ? "border-red-500" : "border-gray-300" }`} aria-label="Ingredients"
          />
        </div>


           <div>
          <Label>Ingredients Declaration</Label>
          <input name="IngredientsDeclaration" placeholder=" " onChange={handleChange} value={form.IngredientsDeclaration}
          className={`w-full border rounded px-3 py-2 ${
            error.IngredientsDeclaration ? "border-red-500" : "border-gray-300" }`} aria-label="IngredientsDeclaration"
          />
        </div>

            <div>
          <Label>Suitable For</Label>
          <input name="SuitableFor" placeholder="" onChange={handleChange} value={form.SuitableFor}

          className={`w-full border rounded px-3 py-2 ${
            error.SuitableFor ? "border-red-500" : "border-gray-300" }`} aria-label="SuitableFor"
          />
        </div>

             <div>
          <Label>Additives</Label>
          <input name="Additives" placeholder="" onChange={handleChange} value={form.Additives}

          className={`w-full border rounded px-3 py-2 ${
            error.Additives ? "border-red-500" : "border-gray-300" }`} aria-label="Additives"
          />
        </div>



         <div>
          <Label>Functionalities</Label>
          <input name="Functionalities" placeholder="" onChange={handleChange} value={form.Functionalities}

          className={`w-full border rounded px-3 py-2 ${
            error.Functionalities ? "border-red-500" : "border-gray-300" }`} aria-label="Functionalities"
          />
        </div>




         <div>
          <Label>Status</Label>
            {/* Status */}
          <select name="IsActive" onChange={handleChange} value={form.IsActive ? 1 : 0}  className={`w-full border rounded px-3 py-2 ${
            error.Status ? "border-red-500" : "border-gray-300" }`} aria-label="Role">
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>




         <div>
          <Label>Shelf Life</Label>
          <textarea name="ShelfLife" placeholder="" onChange={handleChange} value={form.ShelfLife}

          className={`w-full border rounded px-3 py-2 ${
            error.ShelfLife ? "border-red-500" : "border-gray-300" }`} aria-label="input"
          />
        </div>


              <div>
          <Label>Storage Conditions</Label>
          <textarea name="StorageConditions"  onChange={handleChange} value={form.StorageConditions}

          className={`w-full border rounded px-3 py-2 ${
            error.StorageConditions ? "border-red-500" : "border-gray-300" }`} aria-label="input"
          />
        </div>


      <div>
          <Label>Uses</Label>
          <textarea name="Uses" placeholder="" onChange={handleChange} value={form.Uses}

          className={`w-full border rounded px-3 py-2 `} aria-label="input"
          />
        </div>



     <div>
          <Label>Description</Label>
          <textarea name="Description" placeholder="" onChange={handleChange} value={form.Description}

          className={`w-full border rounded px-3 py-2 ${
            error.Description ? "border-red-500" : "border-gray-300" }`} aria-label="Description"
          />
        </div>

      </div>




      {/* SECTION
      <h5 className="mt-6 mb-3 text-lg font-medium text-gray-800 dark:text-white/90">
        Personal Information
      </h5>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div>
          <Label>Product Name</Label>
          <Input type="text"  />
        </div>

        <div>
          <Label>Last Name</Label>
          <Input type="text" />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="text" />
        </div>

        <div>
          <Label>Phone</Label>
          <Input type="text" />
        </div>

        <div className="lg:col-span-2">
          <Label>Bio</Label>
          <Input type="text" />
        </div>

      </div> */}

      {/* FOOTER */}
      <div className="flex justify-end gap-2 mt-6">
        <Button size="sm" variant="outline" onClick={closeFullscreenModal}>
          Close
        </Button>
        <Button type="submit" size="sm" >
          Save
        </Button>
      </div>

    </form>
 </div>
</div>

      </Modal>



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
    </>
  );
}
