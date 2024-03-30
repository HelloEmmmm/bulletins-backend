import { ReactNode, useEffect } from 'react';
import { useLoading } from '../../hooks/useLoading';
import Loading from '../../components/Loading';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Home = (): ReactNode => {
	const nav = useNavigate();

	const { show } = useLoading();

	useEffect(() => {
		nav('/home/users');
	}, []);

	return (
		<div className={'flex justify-between'}>
			{show && <Loading />}
			<div className={'flex text-white gap-4 flex-col w-[200px] py-[30px] px-[20px]'}>
				<Link to={'users'}>用户列表</Link>
				<Link to={'invite'}>邀请码列表</Link>
				<Link to={'general'}>通用设置</Link>
			</div>
			<div className={'flex-1 h-[100vh]'}>
				<Outlet />
			</div>
		</div>
	);
};

export default Home;
