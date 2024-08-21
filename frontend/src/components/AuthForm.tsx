import { Form, Link, useSearchParams } from 'react-router-dom';
function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

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
          <input id="username" type="text" name="username" required />
        </p>
        <p className="flex flex-col body">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className="flex justify-between text-yellow-350 mt-4 [&>*]:bg-white/20 [&>*]:p-2 [&>*]:rounded-md">
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Switch to Register' : 'Switch to Login'}
          </Link>
          <button>Submit</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
