import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import DefaultLayout from './layout/DefaultLayout';
import ECommerce from './pages/Dashboard/ECommerce';
import Merchant from './pages/Merchant';
import Branch from './pages/Branch';
import Products from './pages/Products';
import NewBusiness from './pages/Create/Business';
import UpdateBusiness from './pages/Create/UpdateBusiness';
import AddBranch from './pages/Create/Branch';
import CreateProduct from './pages/Create/Product';
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,

    children: [
      {
        path: '/dashboard',
        element: <ECommerce />,
      },
      {
        path: '/dashboard/merchant/business',
        element: <Merchant />,
      },
      {
        path: '/dashboard/merchant/branch',
        element: <Branch />,
      },
      {
        path: '/dashboard/merchant/branch/new',
        element: <AddBranch />,
      },
      {
        path: '/dashboard/merchant/branch/update',
        element: <AddBranch />,
      },
      {
        path: '/dashboard/products',
        element: <Products />,
      },
      {
        path: '/dashboard/merchant/business/new',
        element: <NewBusiness />,
      },

      {
        path: '/dashboard/merchant/business/update',
        element: <UpdateBusiness />,
      },
      {
        path: '/dashboard/merchant/branch/product/new',
        element: <CreateProduct />,
      },
    ],
  },
  {
    path: '/auth/signin',
    element: <SignIn />,
  },
]);

export default router;
