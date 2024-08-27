import { useRouteError } from 'react-router-dom';

import errorImg from '../assets/icons/plug-error-illustration.svg';

const Error = () => {
  const error = useRouteError() as FetchError;

  let title = 'An error occurred';
  let message = 'Something went wrong';

  if (error?.status === 404) {
    title = 'Not found!';
    message = error.message ?? message;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-2 mt-10 text-2xl text-gray-300">{title}</h1>
      <p>{error && message}</p>
      <p>{!error && 'Page is not existing'}</p>
      <img className="w-80" src={errorImg} alt="Error illustration" />
    </div>
  );
};

export default Error;
