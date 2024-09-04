import { ForwardedRef, useRef } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BusinessDetailForm from '../../components/Forms/newbusiness/step1';
import TimeLineDefault from '../../components/timeline/default';
import { useAppDispatch, useAppSelector } from '../../store';
import BusinessCategoryForm from '../../components/Forms/newbusiness/step2';

const data: Array<{ id: number; title: string; description: string }> = [
  {
    id: 1,
    title: 'Add Business Details',
    description: ' Add business name and Details',
  },
  {
    id: 2,
    title: 'Business Category',
    description: 'Add Business category, Status and etc.',
  },
  {
    id: 3,
    title: 'Add Meta Details & Inventory',
    description: 'Add Business category, Status and etc.',
  },
];

function Form(formRef: ForwardedRef<{ submitForm: () => void }>) {
  const step = useAppSelector((state) => state.app.step);

  switch (step) {
    case 1: {
      return (
        <div className="w-full">
          <BusinessDetailForm reference={formRef} />
        </div>
      );
    }
    case 2:
      return (
        <div className="w-full">
          <BusinessCategoryForm reference={formRef} />
        </div>
      );
  }
}

export default function NewBusiness() {
  const step = useAppSelector((state) => state.app.step);
  const formRef = useRef<{ submitForm: () => void }>(null);

  const handleNext = () => {
    formRef.current?.submitForm();
  };
  return (
    <div>
      <Breadcrumb pageName="New Business" />
      <div className="flex flex-nowrap gap-20">
        <TimeLineDefault data={data} active={step} />
        {Form(formRef)}
      </div>

      <button
        onClick={handleNext}
        type="submit"
        className="flex w-30 mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Next
      </button>
    </div>
  );
}
