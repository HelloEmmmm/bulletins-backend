import Root from './root';
import Home from './home';
import Users from './home/users';
import Invite from './home/invite';
import Index from './general';
import Config from './general/config';
import Message from './general/message';
import Login from './login';

export const routeTree = {
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
					label: '用户列表',
				},
				{
					path: 'invite',
					element: <Invite />,
					label: '邀请码列表',
				},
				{
					path: 'general',
					element: <Index />,
					label: '通用设置',
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
};
