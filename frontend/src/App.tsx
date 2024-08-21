import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Details from './pages/Details';
import Error from './pages/Error';

import { movieLoader, seriesLoader } from './services/loaders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
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
