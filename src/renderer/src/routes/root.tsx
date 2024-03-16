import { ReactNode, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useLoading } from '../hooks/useLoading';

const Root = (): ReactNode => {
	const _ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

	const _nav = useNavigate();

	const { show } = useLoading();
	// useEffect(() => {
	// 	nav('/login');
	// }, []);
	useEffect(() => {
		window.electron.ipcRenderer.on('message', (_event, message) => {
			console.log(message, 999);
		});
	}, []);

	return (
		<>
			{show && <Loading />}
			<Link to={'/home'}>home</Link>
			<Link to={'/login'}>login</Link>
			<Outlet />
		</>
	);
};

export default Root;
