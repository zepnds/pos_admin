import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import routes, { renderRoutes } from './routes';
import { Provider } from 'react-redux';
import store from 'store/index.slice';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  );
};

export default App;
