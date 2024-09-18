import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useAppDispatch, useAppSelector } from '../../store';
import { ForwardedRef, useRef } from 'react';
import BranchDetails from '../../components/Forms/newbranch/step1';
import BranchContact from '../../components/Forms/newbranch/step2';
import { setStep } from '../../store/appslice';
import TimeLineDefault from '../../components/timeline/default';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateForm } from '../../store/merchatSlice';

const createData: Array<{ id: number; title: string; description: string }> = [
  {
    id: 1,
    title: 'Basic Details',
    description: ' Add Branch name and Details',
  },
  {
    id: 2,
    title: 'Contact Details',
    description: 'Add Branch description',
  },
];

const updateData: Array<{ id: number; title: string; description: string }> = [
  {
    id: 1,
    title: 'Basic Details',
    description: ' Update Branch name and Details',
  },
  {
    id: 2,
    title: 'Contact Details',
    description: 'Update Branch description',
  },
];

function Form(formRef: ForwardedRef<{ submitForm: () => void }>) {
  const step = useAppSelector((state) => state.app.step);

  switch (step) {
    case 1: {
      return (
        <div className="w-full">
          <BranchDetails reference={formRef} />
        </div>
      );
    }
    case 2:
      return (
        <div className="w-full">
          <BranchContact reference={formRef} />
        </div>
      );
  }
}

export default function AddBranch() {
  const { search } = useLocation();
  const id = search.split('id=')[1];
  const update = useAppSelector((state) => state.merchant.update);
  const addBranch = useAppSelector((state) => state.merchant.addBranch);
  const step = useAppSelector((state) => state.app.step);
  const createActions = useAppSelector((state) => state.merchant.createActions);
  const formRef = useRef<{ submitForm: () => void }>(null);
  const dispatch = useAppDispatch();
  const handleNext = () => {
    formRef.current?.submitForm();
  };

  const navigate = useNavigate();
  const handlePrevious = () => {
    if (step === 1) return;
    dispatch(setStep(step - 1));
  };

  const handleSuccess = () => {
    dispatch(updateForm(false));
    navigate(`/dashboard/merchant/branch?id=${id}`);
  };

  function Actions(status: string, message: string) {
    switch (status) {
      case 'pending':
        return (
          <div className="relative w-full mb-5">
            <div className="p-3 border-l-4 border-gray-500 -6 rounded-r-xl bg-gray-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 text-gray-600 animate-spin"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-gray-600">
                    <p>Processing your request please wait</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="relative w-full mb-5">
            <div className="p-3 border-l-4 border-green-500 -6 rounded-r-xl bg-green-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-green-600">
                    <p>
                      {message}.{'  '}
                      <span
                        className="font-bold text-black underline cursor-pointer"
                        onClick={handleSuccess}
                      >
                        check now
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="relative w-full mb-5">
            <div className="p-3 border-l-4 border-red-500 -6 rounded-r-xl bg-red-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-red-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-red-600">
                    <p>
                      {message}.{' '}
                      <Link
                        className="font-bold text-red-600 underline"
                        to={`/dashboard/merchant/branch?id=${id}`}
                      >
                        go back
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div>
      {Actions(createActions.status as string, createActions.message as string)}
      <Breadcrumb
        pageName={update ? `Update Branch ${addBranch.title}` : 'New Branch'}
      />
      <div className="flex flex-nowrap gap-20">
        <TimeLineDefault
          data={update ? updateData : createData}
          active={step}
        />
        {Form(formRef)}
      </div>
      <div className="flex gap-5">
        <button
          onClick={handlePrevious}
          type="submit"
          className="flex w-30 mt-5 justify-center rounded-md bg-sky-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          type="submit"
          className="flex w-30 mt-5 justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
