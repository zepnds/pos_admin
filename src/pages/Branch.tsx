import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';

const Branch = () => {
  return (
    <div>
      <Breadcrumb pageName="Branch List" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </div>
  );
};

export default Branch;
