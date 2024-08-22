import { createBrowserRouter, RouterProvider } from 'react-router-dom';import Layout from './Layout';
import Home from './pages/Home';
import Details from './pages/Details';
import Error from './pages/Error';

import { movieLoader, seriesLoader } from './services/loaders';
import Authentication from './pages/Authentication';
import { authAction } from './services/actions';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'auth',
        element: <Authentication />,
        action: authAction
      },
      {
        path: 'movie/:id',
        element: <Details />,
        loader: movieLoader,
        errorElement: <Error />,
      },
      {
        path: 'series/:id',
        element: <Details />,
        loader: seriesLoader,
        errorElement: <Error />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
