import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Home from './routes/home';
import Login from './routes/login';
import Users from './routes/home/users';
import Invite from './routes/home/invite';
import General from './routes/general';

import { LoadingProvider } from './hooks/useLoading';

const router = createHashRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: 'home',
				element: <Home />,
				children: [
					{
						path: 'users',
						element: <Users />,
					},
					{
						path: 'invite',
						element: <Invite />,
					},
					{
						path: 'general',
						element: <General />,
					},
				],
			},
			{
				path: 'login',
				element: <Login />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<LoadingProvider>
			<RouterProvider router={router} />
		</LoadingProvider>
	</React.StrictMode>
);
