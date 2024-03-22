import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const tabs = [
	{
		id: 'config',
		name: '后台配置',
	},
	{
		id: 'message',
		name: '公告配置',
	},
];

const Index = () => {
	const nav = useNavigate();
	const [activeTab, setActiveTab] = useState('config');

	useEffect(() => {
		nav('config');
	}, []);

	return (
		<>
			<div className='block p-4 border-b-2 border-transparent hover:text-white dark:hover:text-white'>
				{tabs.map((tab) => (
					<Link
						to={tab.id}
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={`inline-block p-4 cursor-pointer ${activeTab === tab.id ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
					>
						{tab.name}
					</Link>
				))}
			</div>
			<div className={'h-auto'}>
				<Outlet />
			</div>
		</>
	);
};

export default Index;
