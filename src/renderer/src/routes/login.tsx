import { ReactNode, useCallback, useState } from 'react';
import { LoginInput } from '../components/LoginInput';
import { LoginApi } from '../service/api/login';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (): ReactNode => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const nav = useNavigate();

	const memorizedHandleAccountChange = useCallback(
		(event: { target: { value: string | ((prevState: string) => string) } }) => {
			setUsername(event.target.value);
		},
		[]
	);

	const memorizedHandlePasswordChange = useCallback(
		(event: { target: { value: string | ((prevState: string) => string) } }) => {
			setPassword(event.target.value);
		},
		[]
	);

	return (
		<div className={'w-full h-[100vh] flex justify-center items-center'}>
			<div className='max-w-xs'>
				<form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
					<LoginInput
						label={'账号'}
						maxLength={20}
						value={username}
						onChange={memorizedHandleAccountChange}
					/>
					<LoginInput
						type={'password'}
						label={'密码'}
						maxLength={16}
						value={password}
						onChange={memorizedHandlePasswordChange}
					/>
					<div className='flex items-center justify-between mt-6'>
						<button
							onClick={() => {
								const params = {
									username,
									password,
								};
								if (username && password) {
									LoginApi(params)
										.then((res) => {
											if (res.code === 200) {
												localStorage.setItem('token', res.token);
												nav('/home');
											} else {
												toast.warn(res.msg);
											}
										})
										.catch((e) => {
											console.log(e);
										});
								}
							}}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='button'
						>
							登录
						</button>
						<a
							onClick={() => {
								toast.warn('res.message');
							}}
							className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
						>
							还没有账号？
						</a>
					</div>
				</form>
				<p className='text-center text-gray-500 text-xs'>
					&copy;2024 Riches Corp. All rights reserved.
				</p>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Login;
