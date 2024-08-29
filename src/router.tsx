import { createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/Authentication/SignIn';
import DefaultLayout from './layout/DefaultLayout';
import ECommerce from './pages/Dashboard/ECommerce';
import Merchant from './pages/Merchant';
import Branch from './pages/Branch';
import Products from './pages/Products';
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
        path: '/dashboard/merchant',
        element: <Merchant />,
      },
      {
        path: '/dashboard/branch',
        element: <Branch />,
      },
      {
        path: '/dashboard/products',
        element: <Products />,
      },
    ],
  },
  {
    path: '/auth/signin',
    element: <SignIn />,
  },
]);

export default router;
