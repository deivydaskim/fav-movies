import { ActionFunction, json } from 'react-router-dom';

const handleResponseError = (response: Response) => {
  if (response.status === 409) {
    return json(
      { error: true, message: 'Username already exists.' },
      { status: 409 },
    );
  }
  if (response.status === 400) {
    return json(
      { error: true, message: 'Invalid credentials.' },
      { status: 400 },
    );
  }
  if (response.status === 401) {
    return json(
      { error: true, message: 'Unauthorized access.' },
      { status: 401 },
    );
  }
  if (!response.ok) {
    throw json(
      { error: true, message: 'Could not authenticate.' },
      { status: 500 },
    );
  }
};

export const authAction: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const data = await request.formData();
  const authData = {
    username: data.get('username'),
    password: data.get('password'),
  };

  let response: Response;

  try {
    response = await fetch(`http://localhost:3000/auth/${mode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });
  } catch (error) {
    return json(
      {
        error: true,
        message: 'Server is not responding.',
      },
      { status: 500 },
    );
  }

  const errorResponse = handleResponseError(response);
  if (errorResponse) return errorResponse;

  if (mode === 'register') {
    return json({ message: 'Registration successful, please log in.' });
  }

  const resData = await response.json();
  const token = resData.access_token;

  return json({ access_token: token, username: authData.username });
};
