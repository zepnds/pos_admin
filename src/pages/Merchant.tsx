import { useDispatch } from 'react-redux';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import { AppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import { getBusiness } from '../store/merchatSlice';
import NotFound from './errorpage/404';
import { useNavigate } from 'react-router-dom';

const Merchant = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const merchants = useAppSelector((state) => state.merchant);

  useEffect(() => {
    dispatch(getBusiness({ id: auth.id, token: auth.access_token }))
      .then((res) => console.log('res', res))
      .catch((err) => console.log(err));
  }, [auth]);
  return (
    <div>
      <Breadcrumb pageName="Business List" />
      <div className="mb-5">
        <button
          onClick={() => navigate('/dashboard/merchant/business/new')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold font-bold py-2 px-4 rounded inline-flex items-center  gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span className="capitalize">create new</span>
        </button>
      </div>
      <div className="flex flex-col gap-10">
        {merchants.business.length > 0 ? (
          <TableThree business={merchants.business} />
        ) : (
          <NotFound title="Business list" />
        )}
      </div>
    </div>
  );
};

export default Merchant;
