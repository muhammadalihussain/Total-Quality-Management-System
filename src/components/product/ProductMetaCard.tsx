"use client";
import axios from 'axios';
import React, { AnyActionArg, useEffect, useState, } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";


const ProductMetaCard = ({  id }:any) => {


const [product, setProduct] = useState([]);
  





const [dataCategoriesRecords, setDataCategoriesRecords] = useState<any[]>([]);
const [dataFormsRecords, setDataFormsRecords] = useState<any[]>([]);
const [dataColorsRecords, setDataColorsRecords] = useState<any[]>([]);
const [error, setError] = useState<FormError>({});
const {
    isOpen: isFullscreenModalOpen,
    openModal: openFullscreenModal,
    closeModal: closeFullscreenModal,
  } = useModal();

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



 const loadDataProduct = async () => {

   if (!id) return;


try {
     const res = await fetch(`/api/products/${id}`);
      const result = await res.json();
      setProduct(result.data);
      } catch (err) {
         alert(err.response?.data?.message );
      }

}


useEffect(() => {


  const load = async () => {

if (!id) return;
    try {

      const res = await fetch(`/api/products/${id}`);
      const result = await res.json();
      setProduct(result.data);

      const res1 = await axios.get(`/api/dynamics?type=categories`);
       setDataCategoriesRecords( res1.data.result.recordset);

       const res2 = await axios.get(`/api/dynamics?type=colors`);
       setDataColorsRecords( res2.data.result.recordset);

       const res3 = await axios.get(`/api/dynamics?type=forms`);
        setDataFormsRecords( res3.data.result.recordset);


    } catch (err :any) {
     alert(err.response?.data?.message );
    }

  };

  load();
}, [id]);


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
      if (!id) return;

  await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        ProductName: form.ProductName,
        ProductCode: form.ProductCode,
        CategoryID: form.CategoryID,
        FormID: form.FormID,
        ColorID: form.ColorID,
        Ingredients: form.Ingredients,
 CountryOfOrigin:form.CountryOfOrigin,
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
   //setForm(initialForm); // reset
   loadDataProduct();

 } catch (err:any) {

    setError(err.response?.data?.message || "Something went wrong");
    errorModal.openModal();
  }

  };
  



  const handleOpen = async() => {



setForm({
  ProductName:product.ProductName,
  ProductCode:product.ProductCode,
  CategoryID: product.CategoryID,
  FormID: product.FormID,
  ColorID: product.ColorID,
  CountryOfOrigin:product.CountryOfOrigin,
  Ingredients: product.Ingredients,
  IngredientsDeclaration:product.IngredientsDeclaration,
  SuitableFor: product.SuitableFor,
  Additives: product.Additives,
  Functionalities: product.Functionalities,
  Description: product.Description,
  ShelfLife: product.ShelfLife,
  StorageConditions: product.StorageConditions,
  Uses:product.Uses,
  IsActive: product.IsActive,
}
  );
 openFullscreenModal();
  };

if (!product) {
  return <div>Loading...</div>;
}

if (product.length === 0) {
  return <div>No data found</div>;
}
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">

            <div className="order-3 xl:order-2">
              <h5 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              Product Name:  {product.ProductName}   <b/> <p> Product Code: { product.ProductCode} </p>
              </h5>

<br/>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">

                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Category:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.CategoryName}</p>

                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Form:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.FormName}</p>

                 <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

                   <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Color:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.ColorName}</p>


                   <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

                   <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                CountryOfOrigin:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.CountryOfOrigin}</p>


                   <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

                   <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Ingredients:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.Ingredients}</p>

              </div>
<br/>

                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">

                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                IngredientsDeclaration:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.IngredientsDeclaration}</p>

                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>


                 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                SuitableFor:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.SuitableFor}</p>

                 <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>


                 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Additives:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.Additives}</p>
  </div><br/>
                   <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">


                 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Functionalities:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.Functionalities}</p>

                   <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                ShelfLife:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.ShelfLife}</p>


         <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>

  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                StorageConditions:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.StorageConditions}</p>


    </div>
<br/>

      <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">

 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Uses:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.Uses}</p>
   </div>

<br/>
      <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">

 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Description:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.Description}</p>
   </div>

<br/>
      <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">

 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Status:
              </p>

                 <p className="text-sm text-gray-500 dark:text-gray-400">{product.IsActive ? "Active" : "Inactive"}</p>
   </div>


            </div>

          </div>
          <button
            onClick={handleOpen }
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>




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
            <input name="ProductName" placeholder="" onChange={handleChange} value={form.ProductName}

          className={`w-full border rounded px-3 py-2 ${
            error.ProductName ? "border-red-500" : "border-gray-300" }`} aria-label="Product name"
          />
        </div>

        <div>
          <Label>Product Code</Label>
          <input name="ProductCode" placeholder="" onChange={handleChange} value={form.ProductCode}

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
         <input name="CountryOfOrigin" placeholder="" onChange={handleChange} value={form.CountryOfOrigin}

          className={`w-full border rounded px-3 py-2 ${
            error.CountryOfOrigin ? "border-red-500" : "border-gray-300" }`} aria-label="CountryOfOrigin"
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

          className={`w-full border rounded px-3 py-2 ${
            error.StorageConditions ? "border-red-500" : "border-gray-300" }`} aria-label="input"
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
    </>
  );
}

export default ProductMetaCard;
