import { useCallback, useEffect, useState, Fragment } from 'react';
import CheckInviteCodeInfoModal from '../../components/CheckInviteCodeInfoModal';
import { toast, ToastContainer } from 'react-toastify';
import { GenerateInviteCode, GetAllInviteCodes } from '../../service/api/invite';
import { GetAllInviteCodesRes } from '../../service/api/invite/interface';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';

const Invite = () => {
	const [list, setList] = useState<GetAllInviteCodesRes['data']>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [inviteCodeInfo, setInviteCodeInfo] =
		useState<GetAllInviteCodesRes['data'][number]['user']>(null);

	const memorizedHandleGetCodeList = useCallback(() => {
		GetAllInviteCodes().then((res) => {
			if (res.code === 200) {
				setList(res.data);
			}
		});
	}, []);

	const memorizedHandleGenerateCode = useCallback((type: 1 | 2) => {
		GenerateInviteCode({ is_trial: type }).then((res) => {
			if (res.code === 200) {
				toast.success(res.msg);
				memorizedHandleGetCodeList();
			}
		});
	}, []);

	useEffect(() => {
		memorizedHandleGetCodeList();
	}, []);

	return (
		<div>
			<div className={'flex justify-end gap-4 p-4'}>
				<Menu as='div' className='z-10 relative inline-block text-left'>
					<div>
						<Menu.Button className='inline-flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
							生成邀请码
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
						<Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
							<div className='px-1 py-1 '>
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={() => {
												memorizedHandleGenerateCode(1);
											}}
											className={`${
												active ? 'bg-blue-500 text-white' : 'text-gray-900'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
										>
											试用注册
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											onClick={() => {
												memorizedHandleGenerateCode(2);
											}}
											className={`${
												active ? 'bg-blue-500 text-white' : 'text-gray-900'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
										>
											正式注册
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
			<div className='relative overflow-x-auto'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								邀请码
							</th>
							<th scope='col' className='px-6 py-3'>
								属性
							</th>
							<th scope='col' className='px-6 py-3'>
								是否使用
							</th>
							<th scope='col' className='px-6 py-3'>
								查看
							</th>
						</tr>
					</thead>
					<tbody>
						{list.map((item) => {
							return (
								<tr
									key={item.code}
									className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
								>
									<th
										onClick={() => {
											copyTextToClipboard(item.code);
										}}
										scope='row'
										className='cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
									>
										{item.code}
									</th>
									<td className='px-6 py-4'>{item.is_trial === 1 ? '试用' : '正式'}</td>
									<td className='px-6 py-4'>{item.is_used === 1 ? '未使用' : '已使用'}</td>
									<td className='px-6 py-4'>
										{item.user && (
											<button
												onClick={() => {
													setInviteCodeInfo(item.user);
													setShowModal(true);
												}}
												className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
											>
												查看使用信息
											</button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{showModal && (
				<CheckInviteCodeInfoModal
					info={inviteCodeInfo}
					onClose={() => {
						setShowModal(false);
						setInviteCodeInfo(null);
					}}
				/>
			)}
			<ToastContainer />
		</div>
	);
};

export default Invite;
