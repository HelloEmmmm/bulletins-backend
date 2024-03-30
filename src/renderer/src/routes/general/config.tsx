import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetConfigInfo, SaveConfigInfo } from '../../service/api/general';

const Config = () => {
	const [readOnly, setReadOnly] = useState(true);
	const [phone, setPhone] = useState<string>('');
	const [wechat, setWechat] = useState<string>('');
	const [qq, setQQ] = useState<string>('');
	const [remarks, setRemarks] = useState<string>('');

	useEffect(() => {
		GetConfigInfo()
			.then((config) => {
				setPhone(config.data.phone);
				setWechat(config.data.wechat);
				setQQ(config.data.qq);
				setRemarks(config.data.remarks || '');
			})
			.catch((res) => {
				toast.warn(res?.msg || '获取配置信息失败，请联系管理员');
			});
	}, []);

	const saveConfig = () => {
		if (phone && wechat && qq) {
			const params = {
				phone,
				wechat,
				qq,
				remarks,
			};
			SaveConfigInfo(params)
				.then((res) => {
					if (res.code === 200) {
						setReadOnly(true);
					} else {
						toast.warn(res.msg);
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	return (
		<form className={'ml-4'}>
			<div className='mb-6'>
				<label htmlFor='phone' className='block mb-2 text-sm font-medium text-white'>
					手机号
				</label>
				<input
					type='text'
					disabled={readOnly}
					placeholder='输入手机号'
					value={phone}
					onChange={(event) => setPhone(event.target.value)}
					className='w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					required
				/>
			</div>
			<div className='mb-6'>
				<label htmlFor='wechat' className='block mb-2 text-sm font-medium text-white'>
					微信号
				</label>
				<input
					disabled={readOnly}
					value={wechat}
					onChange={(event) => setWechat(event.target.value)}
					className='w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='输入微信号'
				/>
			</div>
			<div className='mb-6'>
				<label htmlFor='qq' className='block mb-2 text-sm font-medium text-white'>
					QQ号
				</label>
				<input
					disabled={readOnly}
					value={qq}
					className='w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					onChange={(event) => setQQ(event.target.value)}
					placeholder='输入QQ号'
				/>
			</div>
			<div className='mb-6'>
				<label htmlFor='remarks' className='block mb-2 text-sm font-medium text-white'>
					备注
				</label>
				<textarea
					disabled={readOnly}
					rows={2}
					value={remarks}
					onChange={(event) => setRemarks(event.target.value)}
					className='w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='输入备注'
				/>
			</div>
			<div className='mb-6'>
				{readOnly ? (
					<button
						onClick={() => setReadOnly(false)}
						className='bg-blue-500 hover:bg-blue-700 inline-block text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='button'
					>
						编辑
					</button>
				) : (
					<div>
						<button
							onClick={() => saveConfig()}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='button'
						>
							保存
						</button>
						<button
							onClick={() => setReadOnly(true)}
							className='bg-gray-500 ml-4 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
							type='button'
						>
							取消
						</button>
					</div>
				)}
			</div>
		</form>
	);
};

export default Config;
