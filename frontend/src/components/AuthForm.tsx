import { Form, Link, useActionData, useSearchParams } from 'react-router-dom';

type AuthResponse = AuthSuccessResponse | ErrorResponse;

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  const data = useActionData() as AuthResponse;

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
          />
        </p>
        {data && 'error' in data && <p>{data.message}</p>}
        <div className="flex justify-between text-yellow-350 mt-4 [&>*]:bg-white/20 [&>*]:p-2 [&>*]:rounded-md">
          <Link to={`?mode=${isLogin ? 'register' : 'login'}`}>
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </Link>
          <button>Submit</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
