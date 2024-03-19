import { ReactNode, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useLoading } from '../hooks/useLoading';

const Root = (): ReactNode => {
	const _ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

	const _nav = useNavigate();

	const { show } = useLoading();

	useEffect(() => {
		window.electron.ipcRenderer.on('message', (_event, message) => {
			console.log(message, 999);
		});
		const token = localStorage.getItem('token');
		if (!token) {
			_nav('login');
		}
	}, []);

	return (
		<div className={'flex justify-between'}>
			{show && <Loading />}
			<div className={'flex text-white gap-4 flex-col w-[200px] py-[30px] px-[20px]'}>
				<Link to={'/users'}>用户列表</Link>
				<Link to={'/invite'}>邀请码列表</Link>
			</div>
			<div className={'flex-1'}>
				<Outlet />
			</div>
		</div>
	);
};

export default Root;
