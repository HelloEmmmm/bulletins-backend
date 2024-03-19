import { useCallback, useEffect, useState } from 'react';
import CheckInviteCodeInfoModal from '../components/CheckInviteCodeInfoModal';
import { ToastContainer } from 'react-toastify';
import { GenerateInviteCode, GetAllInviteCodes } from '../service/api/invite';
import { GetAllInviteCodesRes } from '../service/api/invite/interface';

const Invite = () => {
	const [list, setList] = useState<GetAllInviteCodesRes['data']>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [inviteCodeInfo, setInviteCodeInfo] =
		useState<GetAllInviteCodesRes['data'][number]['user']>(null);

	const memorizedHandleGetUsers = useCallback(() => {
		GetAllInviteCodes().then((res) => {
			if (res.code === 200) {
				setList(res.data);
			}
		});
	}, []);

	useEffect(() => {
		memorizedHandleGetUsers();
	}, []);

	return (
		<div>
			<div className={'flex justify-end gap-4 p-4'}>
				<button
					onClick={() => {
						GenerateInviteCode({ is_trial: 1 }).then((res) => {
							console.log(res);
						});
					}}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					生成邀请码
				</button>
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
										scope='row'
										className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
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
