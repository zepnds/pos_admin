import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableBranch from '../components/Tables/TableBranch';
import NotFound from './errorpage/404';
import { useAppDispatch, useAppSelector } from '../store';

import {
  deleteBranch,
  getBranch,
  resetBranch,
  resetMessage,
  setBranch,
  setSelectedItem,
  updateForm,
} from '../store/merchatSlice';
import { setOpenDialog, setStep } from '../store/appslice';
import { IBranch } from '../types/merchant';
import AppDialog from '../components/Dialog';

const Branch = () => {
  const auth = useAppSelector((state) => state.auth);
  const branchlist = useAppSelector((state) => state.merchant.branches);
  const dispatch = useAppDispatch();

  const merchant = useAppSelector((state) => state.merchant);

  const navigate = useNavigate();
  const handleDelete = (title: string, desc: string) => {
    dispatch(setOpenDialog({ title, dialogDesc: desc, status: true }));
  };
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
  const title: Array<string> = ['Name', 'Address', 'Email Address', 'Actions'];

  const handleConfirm = () => {
    if (merchant.selectedItem.id !== 0) {
      dispatch(
        deleteBranch({
          token: auth.access_token,
          id: merchant.selectedItem.id,
        }),
      ).then((res) => {
        if (res) {
          const branches = merchant.branches;
          const reset = branches.filter(
            (item) => item.id !== merchant.selectedItem.id,
          );
          dispatch(resetBranch(reset));
        }
      });
    }
  };

  type SelectedItem = {
    id: number;
    default: boolean;
  };

  const onChangeBusiness = (id: string) => {
    console.log('id', id);
    const items: SelectedItem = JSON.parse(id);
    console.log('items', items.default);
    if (items.default) {
      dispatch(getBranch({ token: auth.access_token, id: items.id }));
      dispatch(setSelectedItem({ id: 0, default: true }));
    } else {
      dispatch(setSelectedItem(JSON.parse(id)));
      dispatch(getBranch({ token: auth.access_token, id: items.id }));
    }
  };

  return (
    <>
      <div>
        <Breadcrumb pageName="Branch List" />
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => {
              if (!merchant.selectedItem.default) {
                navigate(
                  `/dashboard/merchant/branch/new?id=${merchant.selectedItem.id}`,
                );
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
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold font-bold py-2 px-2 rounded inline-flex items-center  gap-1"
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
          <select
            defaultValue={JSON.stringify(merchant.selectedItem)}
            onChange={(e) => onChangeBusiness(e.target.value)}
            className="capitalize w-60 rounded-lg border border-stroke bg-transparent py-3 pl-3 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          >
            {merchant.update ? null : (
              <option
                className="capitalize "
                value={JSON.stringify({ id: 0, default: true })}
              >
                Select Options
              </option>
            )}

            {merchant.business.map((i) => (
              <option
                className="capitalize"
                data-tooltip-target="tooltip"
                key={i.id}
                value={JSON.stringify({ id: i.id, default: false })}
              >
                BC-{i.id}
              </option>
            ))}
          </select>
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
      <AppDialog handleConfirm={handleConfirm} />
    </>
  );
};

export default Branch;
