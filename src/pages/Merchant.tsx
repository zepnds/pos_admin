import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';

const Merchant = () => {
  return (
    <div>
      <Breadcrumb pageName="Business List" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </div>
  );
};

export default Merchant;
