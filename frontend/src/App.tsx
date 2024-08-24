import { createBrowserRouter, RouterProvider } from 'react-router-dom';import Layout from './Layout';
import Home from './pages/Home';
import Details from './pages/Details';
import Error from './pages/Error';

import { authCheckLoader, movieLoader, seriesLoader } from './services/loaders';
import Authentication from './pages/Authentication';
import { authAction } from './services/actions';
import ProtectedRoute from './components/ProtectedRoute';
import Favorite from './pages/Favorite';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'auth',
        element: <Authentication />,
        loader: authCheckLoader,
        action: authAction,
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
        path: 'favorite',
        element: (
          <ProtectedRoute redirectTo={'/auth?mode=login'}>
            <Favorite />
          </ProtectedRoute>
        ),
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
