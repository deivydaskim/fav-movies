import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  const data = useActionData() as AuthResponse;
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const isError = data && 'error' in data;
  const isLoginSuccess = data && 'access_token' in data;
  const isRegistered = data && 'message' in data && !('error' in data);

  // For handling ActionData
  useEffect(() => {
    if (isLoginSuccess) {
      login(data.username, data.access_token);
      navigate('/');
    }
    setIsLoading(false);
  }, [data, isLoginSuccess, login, navigate]);

  const handleSubmit = () => {
    setIsLoading(true);
  };

  return (
    <>
      <Form
        method="post"
        className="mx-auto my-16 flex max-w-96 flex-col gap-2 rounded-xl px-10 py-6 gradient-gray"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center headline-m">
          {isLogin ? 'Login' : 'Register'}
        </h1>
        <p className="flex flex-col body">
          <label htmlFor="username">Username</label>
          <input
            className="px-2 text-black rounded-sm"
            id="username"
            type="text"
            name="username"
            required
            disabled={isLoading}
          />
        </p>
        <p className="flex flex-col body">
          <label htmlFor="password">Password</label>
          <input
            className="px-2 text-black rounded-sm"
            id="password"
            type="password"
            name="password"
            required
            disabled={isLoading}
          />
        </p>
        {isRegistered && <p className="text-green-500">{data.message}</p>}
        {isError && <p className="text-red-500">{data.message}</p>}
        <div className="mt-4 flex justify-between text-yellow-350 [&>*]:rounded-md [&>*]:bg-white/20 [&>*]:p-2">
          {isLoading ? (
            <div className="cursor-not-allowed opacity-70">
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </div>
          ) : (
            <Link to={`?mode=${isLogin ? 'register' : 'login'}`}>
              {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </Link>
          )}
          <button className='disabled:opacity-70' type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
