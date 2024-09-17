import { useDispatch } from 'react-redux';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { AppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import {
  deleteBusiness,
  getBusiness,
  resetMessage,
  setBusiness,
  resetBusiness,
  updateForm,
} from '../store/merchatSlice';
import NotFound from './errorpage/404';
import { useNavigate } from 'react-router-dom';

import { setOpenDialog, setStep } from '../store/appslice';
import AppDialog from '../components/Dialog';
import { Business } from '../types/merchant';
import TableBusiness from '../components/Tables/TableBusiness';

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

  const handleDelete = (title: string, desc: string) => {
    dispatch(setOpenDialog({ title, dialogDesc: desc, status: true }));
  };

  const handleConfirm = () => {
    if (merchants.selectedId !== 0) {
      dispatch(
        deleteBusiness({ token: auth.access_token, id: merchants.selectedId }),
      ).then((res) => {
        if (res) {
          const business = merchants.business;
          const filteredBusiness = business.filter(
            (item) => item.id !== merchants.selectedId,
          );
          dispatch(resetBusiness(filteredBusiness));
        }
      });
    }
  };

  const handleEdit = (business: Business) => {
    dispatch(
      setBusiness({
        title: business.name,
        address: business.address,
        category: business.type,
        email: business.email,
        id: business.id,
      }),
    );
    dispatch(resetMessage());
    dispatch(updateForm(true));
    navigate('/dashboard/merchant/business/update');
  };

  const handleBranch = (id: number) => {
    navigate(`/dashboard/merchant/branch?id=${id}`);
  };

  const title: Array<string> = ['Name', 'Address', 'Type', 'Actions'];

  return (
    <>
      <div>
        <Breadcrumb pageName="Business List" />
        <div className="mb-5">
          <button
            onClick={() => {
              navigate('/dashboard/merchant/business/new'),
                dispatch(updateForm(false)),
                dispatch(
                  setBusiness({
                    title: '',
                    address: '',
                    category: '',
                    email: '',
                    id: '',
                  }),
                ),
                dispatch(resetMessage());
              dispatch(setStep(1));
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold font-bold py-1 px-1.5 rounded inline-flex items-center  gap-1"
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

            <span className="capitalize text-sm">create new</span>
          </button>
        </div>
        <div className="flex flex-col gap-10">
          {merchants?.business?.length > 0 ? (
            <TableBusiness
              handleDelete={handleDelete}
              business={merchants.business}
              handleEdit={handleEdit}
              title={title}
              handleBranch={handleBranch}
            />
          ) : (
            <NotFound title="Business list" />
          )}
        </div>
      </div>
      <AppDialog handleConfirm={handleConfirm} />
    </>
  );
};

export default Merchant;
