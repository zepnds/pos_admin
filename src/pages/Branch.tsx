import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableBranch from '../components/Tables/TableBranch';
import NotFound from './errorpage/404';
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import {
  getBranch,
  resetMessage,
  setBranch,
  updateForm,
} from '../store/merchatSlice';
import { setStep } from '../store/appslice';
import { IBranch } from '../types/merchant';
// import TableThree from '../components/Tables/TableThree';

const Branch = () => {
  const auth = useAppSelector((state) => state.auth);
  const branchlist = useAppSelector((state) => state.merchant.branches);
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const id = search.split('id=')[1];

  const navigate = useNavigate();
  const handleDelete = () => {};
  const handleEdit = (branch: IBranch) => {
    dispatch(
      setBranch({
        title: branch.branch_name,
        address: branch.branch_address,
        code: branch.company_code,
        email: branch.branch_email,
        id: branch.id,
      }),
    );
    dispatch(resetMessage());
    dispatch(updateForm(true));
    navigate(`/dashboard/merchant/branch/update?id=${branch.id}`);
    dispatch(setStep(1));
  };
  const title: Array<string> = [
    'Name',
    'Company Code',
    'Email Address',
    'Actions',
  ];

  useEffect(() => {
    if (parseInt(id) !== 0) {
      dispatch(getBranch({ token: auth.access_token, id: parseInt(id) }));
    }
  }, [auth]);

  return (
    <div>
      <Breadcrumb pageName="Branch List" />
      <div className="mb-5">
        <button
          onClick={() => {
            navigate(`/dashboard/merchant/branch/new?id=${id}`);
            dispatch(updateForm(false)),
              dispatch(
                setBranch({
                  title: '',
                  address: '',
                  email: '',
                  name: '',
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
        {branchlist?.length > 0 ? (
          <TableBranch
            handleDelete={handleDelete}
            branch={branchlist.map((item) => {
              return {
                ...item,
                branch_name: item.name,
                company_code: item.code,
                branch_address: item.address,
                branch_email: item.email,
              };
            })}
            handleEdit={handleEdit}
            title={title}
          />
        ) : (
          <NotFound title="Branch list" />
        )}
      </div>
    </div>
  );
};

export default Branch;
