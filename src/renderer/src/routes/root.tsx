import { ReactNode, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Root = (): ReactNode => {
	const _ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

	const _nav = useNavigate();

	useEffect(() => {
		window.electron.ipcRenderer.on('message', (_event, message) => {
			console.log(message, 999);
		});
		const token = localStorage.getItem('token');
		if (!token) {
			_nav('login');
		} else {
			_nav('home/users');
		}
	}, []);

	return (
		<div className={'flex justify-between'}>
			<div className={'flex-1 h-[100vh]'}>
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
