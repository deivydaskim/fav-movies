import { ActionFunction, json } from 'react-router-dom';

export const authAction: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const data = await request.formData();
  const authData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  const response = await fetch('http://localhost:3000/auth/' + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  });

  if (
    response.status === 409 ||
    response.status === 400 ||
    response.status === 401
  ) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authentcicate' }, { status: 500 });
  }

  if (mode === 'register') {
    return json({ message: 'Registration successful, please log in.' });
  }

  const resData = await response.json();
  const token = resData.access_token;

  return json({ access_token: token, username: authData.username });
};
