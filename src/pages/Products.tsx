import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableThree from '../components/Tables/TableThree';

const Products = () => {
  return (
    <div>
      <Breadcrumb pageName="Product List" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </div>
  );
};

export default Products;
