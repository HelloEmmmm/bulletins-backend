import { useNavigate } from 'react-router-dom';

const Header = () => {
	const nav = useNavigate();

	return (
		<div className={'p-[16px] flex justify-end'}>
			<button
				onClick={() => {
					localStorage.setItem('token', '');
					nav('/login');
				}}
				type='button'
				className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
			>
				退出登录
			</button>
		</div>
	);
};

export default Header;
