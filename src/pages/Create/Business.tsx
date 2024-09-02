import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TimeLineDefault from '../../components/timeline/default';
import { useAppSelector } from '../../store';

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

export default function NewBusiness() {
  const step = useAppSelector((state) => state.app.step);
  return (
    <div>
      <Breadcrumb pageName="New Business" />
      <div className="flex flex-nowrap gap-20">
        <TimeLineDefault data={data} active={step} />
        <div className="w-full">
          <form action="#" className="space-y-6 w-full">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Business Title
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Business Details
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </form>{' '}
        </div>
      </div>
      <button
        type="submit"
        className="flex w-30 mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Next
      </button>
    </div>
  );
}
