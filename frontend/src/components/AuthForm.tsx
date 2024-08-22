import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useRef } from 'react';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const data = useActionData() as AuthResponse;
  const { login } = useAuth();
  const navigate = useNavigate();

  // Refs for clearing inputs
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const isError = data && 'error' in data;
  const isLoginSuccess = data && 'access_token' in data;
  const isRegistered = data && 'message' in data && !('error' in data);

  // For handling ActionData
  useEffect(() => {
    if (isLoginSuccess) {
      login(data.username, data.access_token);
      navigate('/');
    }
    if (isRegistered) {
      usernameRef!.current!.value = '';
      passwordRef!.current!.value = '';

      setTimeout(() => {
        navigate('/auth?mode=login');
      }, 3000);
    }
  }, [data, isLogin, isRegistered, isLoginSuccess, login, navigate]);

  return (
    <>
      <Form
        method="post"
        className="flex flex-col gap-2 max-w-96 my-16 mx-auto gradient-gray py-6 px-10 rounded-xl"
      >
        <h1 className="headline-m text-center">
          {isLogin ? 'Login' : 'Register'}
        </h1>
        <p className="flex flex-col body">
          <label htmlFor="username">Username</label>
          <input
            className="text-black px-2"
            id="username"
            type="text"
            name="username"
            required
            ref={usernameRef}
          />
        </p>
        <p className="flex flex-col body">
          <label htmlFor="password">Password</label>
          <input
            className="text-black px-2"
            id="password"
            type="password"
            name="password"
            required
            ref={passwordRef}
          />
        </p>
        {isRegistered && <p className="text-green-500">{data.message}</p>}
        {isError && <p className="text-red-500">{data.message}</p>}
        <div className="flex justify-between text-yellow-350 mt-4 [&>*]:bg-white/20 [&>*]:p-2 [&>*]:rounded-md">
          <Link to={`?mode=${isLogin ? 'register' : 'login'}`}>
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </Link>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
