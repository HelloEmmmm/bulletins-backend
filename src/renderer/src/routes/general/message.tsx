import { useCallback, useEffect, useState } from 'react';
import { NoticeItem } from '../../service/api/general/interface';
import { GetMessageList } from '../../service/api/general';
import ModifyNoticeModal from '../../components/home/ModifyNoticeModal';
import AddNoticeModal from '../../components/general/AddNoticeModal';

const Message = () => {
	const [list, setList] = useState<NoticeItem[]>([]);
	const [showModifyModal, setShowModifyModal] = useState<boolean>(false);
	const [showAddModal, setShowAddModal] = useState<boolean>(false);
	const [curNotice, setCurNotice] = useState<NoticeItem | undefined>(undefined);

	const getMessageList = useCallback(() => {
		// todo 传过滤条件
		GetMessageList({}).then((res) => {
			if (res.code === 200) {
				setList(res.data);
			}
		});
	}, []);

	useEffect(() => {
		getMessageList();
	}, []);

	return (
		<>
			<div className={'mb-4'}>
				<button
					onClick={() => {
						setShowAddModal(true);
					}}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					新增公告
				</button>
			</div>
			<div className='relative overflow-x-auto'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-6 py-3 w-[300px]'>
								公告内容
							</th>
							<th scope='col' className='px-6 py-3'>
								是否启用
							</th>
							<th scope='col' className='px-6 py-3'>
								创建时间
							</th>
							<th scope='col' className='px-6 py-3'>
								公告类型
							</th>
							<th scope='col' className='px-6 py-3'>
								操作
							</th>
						</tr>
					</thead>
					<tbody>
						{list.map((item) => {
							return (
								<tr
									key={item.id}
									className='w-[300px] bg-white border-b dark:bg-gray-800 dark:border-gray-700'
								>
									<td
										scope='row'
										className='px-6 py-4 font-medium text-gray-900 whitespace-pre-wrap dark:text-white'
									>
										{item.message}
									</td>
									<td className='px-6 py-4'>{item.type === 1 ? '启用' : '禁用'}</td>
									<td className='px-6 py-4'>{item.created_at}</td>
									<td className='px-6 py-4'>
										{item.is_trial === 1 ? '试用' : item.is_trial === 2 ? '正式' : '全部'}
									</td>
									<td className='px-6 py-4'>
										{item.id && (
											<button
												onClick={() => {
													// setInviteCodeInfo(item.user);
													setCurNotice(item);
													setShowModifyModal(true);
												}}
												className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
											>
												修改公告状态
											</button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{showModifyModal && curNotice && (
				<ModifyNoticeModal
					noticeId={curNotice?.id}
					type={curNotice?.type}
					onClose={() => {
						setShowModifyModal(false);
					}}
					onOk={() => {
						getMessageList();
						setShowModifyModal(false);
					}}
				/>
			)}
			{showAddModal && (
				<AddNoticeModal
					onClose={() => {
						setShowAddModal(false);
					}}
					onOk={() => {
						getMessageList();
						setShowAddModal(false);
					}}
				/>
			)}
		</>
	);
};

export default Message;
