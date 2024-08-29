import { useDispatch } from 'react-redux';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';
import { AppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import { getBusiness } from '../store/merchatSlice';

const Merchant = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      <div className="flex flex-col gap-10">
        <TableThree business={merchants.business} />
      </div>
    </div>
  );
};

export default Merchant;
