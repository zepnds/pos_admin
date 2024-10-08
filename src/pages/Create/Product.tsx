import { ForwardedRef, useRef } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ProductDetailsForm from '../../components/Forms/newproduct/step1';
import TimeLineDefault from '../../components/timeline/default';
import { useAppSelector } from '../../store';

// type Product = {
//   name: string;
//   description: string;
//   category: string;
//   supplier: string;
//   price: number;
//   sku: string;
//   quantity_in_stock: number;
//   is_active: boolean;
//   barcode: string;
//   branchCode: string;
//   companyCode: string;
// };

type CreateData = { id: number; title: string; description: string };

const createData: Array<CreateData> = [
  {
    id: 1,
    title: 'Add Product Details',
    description: 'Add Product Name and Details',
  },
  {
    id: 2,
    title: 'Product Categories',
    description: 'Add product category, active and supplier',
  },
  {
    id: 3,
    title: 'Selling Prices',
    description: 'Add product basic price & discount',
  },
  {
    id: 4,
    title: 'Advance',
    description: 'Add meta details & Inventory details',
  },
];

function Form(formRef: ForwardedRef<{ submitForm: () => void }>) {
  const step = useAppSelector((state) => state.app.step);

  switch (step) {
    case 1: {
      return (
        <div className="w-full">
          <ProductDetailsForm reference={formRef} />
        </div>
      );
    }
  }
}

export default function CreateProduct() {
  const formRef = useRef<{ submitForm: () => void }>(null);
  const step = useAppSelector((state) => state.app.step);
  return (
    <div>
      <Breadcrumb pageName="Create Product" />
      <div className="flex flex-nowrap gap-20">
        <TimeLineDefault data={createData} active={step} />
        {Form(formRef)}
      </div>
      <div className="flex gap-5">
        <button
          // onClick={handlePrevious}
          type="submit"
          className="flex w-30 mt-5 justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Previous
        </button>
        <button
          // onClick={handleNext}
          type="submit"
          className="flex w-30 mt-5 justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
