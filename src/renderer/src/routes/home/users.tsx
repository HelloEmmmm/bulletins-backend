import { Fragment, useCallback, useEffect, useState } from 'react';
import { GetUsers, UpdateTrial, User } from '../../service/api/users';
import day from 'dayjs';
import SendMessageModal from '../../components/home/SendMessageModal';
import { toast, ToastContainer } from 'react-toastify';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import AddTimeModal from '../../components/AddTimeModal';
import CheckHistoryModal from '../../components/home/CheckHistoryModal';

const StatusArr = ['审核中', '审核成功', '审核驳回'];

const Users = () => {
	const [list, setList] = useState<Array<User>>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showAddTimeModal, setShowAddTimeModal] = useState<boolean>(false);
	const [checkHistoryModal, setCheckHistoryModal] = useState<boolean>(false);
	const [userId, setUserId] = useState<undefined | number>(undefined);

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

	const memorizedHandleOpenAddTimeModal = useCallback((bool: boolean, id?: number) => {
		if (bool) {
			setShowAddTimeModal(true);
			setUserId(id);
		} else {
			setShowAddTimeModal(false);
			setUserId(undefined);
		}
	}, []);

	useEffect(() => {
		memorizedHandleGetUsers();
	}, []);

	return (
		<div>
			<div className={'flex justify-end gap-4 p-4'}>
				<button
					onClick={() => setShowModal(!showModal)}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					群发
				</button>
			</div>
			<div className='relative'>
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
							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{list.map((item) => {
							return (
								<tr
									key={item.id}
									className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
								>
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
										{day(item.expiration_date * 1000).format('YYYY-MM-DD hh:mm:ss')}
									</td>
									<td className='px-6 py-4'>{item.last_login_at}</td>
									<td className='px-6 py-4'>{item.type === 1 ? '是' : '否'}</td>
									<td className='px-6 py-4'>{StatusArr[item.status - 1]}</td>
									<td className='px-6 py-4'>{item.date_type === 1 ? '是' : '否'}</td>
									<td className='px-6 py-4'>
										<Menu as='div' className='z-1 relative inline-block text-left'>
											<div>
												<Menu.Button className='inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
													操作
													<ChevronDownIcon
														className='-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100'
														aria-hidden='true'
													/>
												</Menu.Button>
											</div>
											<Transition
												as={Fragment}
												enter='transition ease-out duration-100'
												enterFrom='transform opacity-0 scale-95'
												enterTo='transform opacity-100 scale-100'
												leave='transition ease-in duration-75'
												leaveFrom='transform opacity-100 scale-100'
												leaveTo='transform opacity-0 scale-95'
											>
												<Menu.Items className='z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
													<div className='px-1 py-1 '>
														<Menu.Item>
															{({ active }) => (
																<button
																	onClick={() => {
																		memorizedHandleOpenAddTimeModal(true, item.id);
																	}}
																	className={`${
																		active ? 'bg-blue-500 text-white' : 'text-gray-900'
																	} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																>
																	增加试用时间
																</button>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<button
																	onClick={() => {
																		setCheckHistoryModal(true);
																		setUserId(item.id);
																	}}
																	className={`${
																		active ? 'bg-blue-500 text-white' : 'text-gray-900'
																	} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
																>
																	查看加时记录
																</button>
															)}
														</Menu.Item>
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{showModal && (
				<SendMessageModal
					onOk={(msg) => {
						toast.success(msg);
						setShowModal(false);
					}}
					onClose={() => setShowModal(false)}
				/>
			)}
			{showAddTimeModal && (
				<AddTimeModal
					onOk={(msg) => {
						memorizedHandleGetUsers();
						toast.success(msg);
						memorizedHandleOpenAddTimeModal(false);
					}}
					userId={userId}
					onClose={() => memorizedHandleOpenAddTimeModal(false)}
				/>
			)}
			{checkHistoryModal && (
				<CheckHistoryModal id={userId} onClose={() => setCheckHistoryModal(false)} />
			)}
			<ToastContainer />
		</div>
	);
};

export default Users;
