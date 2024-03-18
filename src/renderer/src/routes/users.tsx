import { useCallback, useEffect, useState } from 'react';
import { GetUsers, UpdateTrial, User } from '../service/api/users';
import day from 'dayjs';

const StatusArr = ['审核中', '审核成功', '审核驳回'];

const Users = () => {
	const [list, setList] = useState<Array<User>>([]);

	const memorizedHandleGetUsers = useCallback(() => {
		GetUsers().then((res) => {
			if (res.code === 200) {
				setList(res.data);
			}
		});
	}, []);

	const memorizedHandleUserTrial = useCallback((id: number, trial: 1 | 2) => {
		UpdateTrial({ user_id: id, is_trial: trial }).then((res) => {
			if (res.code === 200) {
				memorizedHandleGetUsers();
			}
		});
	}, []);

	useEffect(() => {
		memorizedHandleGetUsers();
	}, []);

	return (
		<div className='relative overflow-x-auto'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th scope='col' className='px-6 py-3'>
							id
						</th>
						<th scope='col' className='px-6 py-3'>
							账号
						</th>
						<th scope='col' className='px-6 py-3'>
							手机号
						</th>
						<th scope='col' className='px-6 py-3'>
							试用
						</th>
						<th scope='col' className='px-6 py-3'>
							过期时间
						</th>
						<th scope='col' className='px-6 py-3'>
							最后登录时间
						</th>
						<th scope='col' className='px-6 py-3'>
							禁用
						</th>
						<th scope='col' className='px-6 py-3'>
							审核状态
						</th>
						<th scope='col' className='px-6 py-3'>
							是否到期
						</th>
					</tr>
				</thead>
				<tbody>
					{list.map((item) => {
						return (
							<tr key={item.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
								<th
									scope='row'
									className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
								>
									{item.id}
								</th>
								<td className='px-6 py-4'>{item.username}</td>
								<td className='px-6 py-4'>{item.phone_number}</td>
								<td className='px-6 py-4 flex items-center gap-2'>
									{item.is_trial === 1 ? '是' : '否'}
									<label className='inline-flex items-center cursor-pointer'>
										<input
											onChange={(event) => {
												const b = event.target.checked ? 1 : 2;
												memorizedHandleUserTrial(item.id, b);
											}}
											type='checkbox'
											checked={item.is_trial === 1}
											className='sr-only peer'
										/>
										<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
									</label>
								</td>
								<td className='px-6 py-4'>
									{day(item.expiration_date * 1000).format('YYYY-MM-DD')}
								</td>
								<td className='px-6 py-4'>{item.last_login_at}</td>
								<td className='px-6 py-4'>{item.type === 1 ? '是' : '否'}</td>
								<td className='px-6 py-4'>{StatusArr[item.status - 1]}</td>
								<td className='px-6 py-4'>{item.date_type === 1 ? '是' : '否'}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
