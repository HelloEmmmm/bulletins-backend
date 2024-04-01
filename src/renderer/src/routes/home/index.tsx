import { ReactNode, useEffect } from 'react';
import { useLoading } from '../../hooks/useLoading';
import Loading from '../../components/Loading';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routeTree } from '../config';
import Header from '../../components/Header';

const Home = (): ReactNode => {
	const location = useLocation();
	const nav = useNavigate();

	useEffect(() => {
		nav('users');
	}, []);

	const { show } = useLoading();

	return (
		<div className={'flex justify-between'}>
			{show && <Loading />}
			<div className={'flex text-white gap-4 flex-col w-[200px] py-[30px] px-[20px]'}>
				{routeTree.children
					.find((item) => item.path === 'home')
					?.children?.map((item) => {
						return (
							<Link
								className={`${location.pathname.includes(item.path) && 'bg-blue-500'} p-2 text-center rounded-[4px]`}
								key={item.path}
								to={item.path}
							>
								{item.label}
							</Link>
						);
					})}
			</div>
			<div className={'flex-1 h-[100vh]'}>
				<Header />
				<Outlet />
			</div>
		</div>
	);
};

export default Home;
