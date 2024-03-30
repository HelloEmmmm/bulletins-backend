import './assets/main.css';

import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Home from './routes/home';
import Login from './routes/login';
import Users from './routes/home/users';
import Invite from './routes/home/invite';
import Index from './routes/general';
import Config from './routes/general/config';
import Message from './routes/general/message';

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
						element: <Index />,
						children: [
							{
								path: 'config',
								element: <Config />,
							},
							{
								path: 'message',
								element: <Message />,
							},
						],
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
	<LoadingProvider>
		<RouterProvider router={router} />
	</LoadingProvider>
);
