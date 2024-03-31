import { useCallback, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CheckOperationHistory, OperationHistoryResponse } from '../../../service/api/users';
import dayjs from 'dayjs';

export interface ModalProps {
	onClose: () => void;
	id?: number;
}

const CheckHistoryModal = (props: ModalProps) => {
	const { id } = props;

	const [history, setHistory] = useState<OperationHistoryResponse['data']>([]);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

	const [startDate, endDate] = dateRange;

	const memorizedHandleHistoryChange = useCallback((arr) => {
		setHistory(arr);
	}, []);

	useEffect(() => {
		if (!id) return;
		CheckOperationHistory({
			user_id: id,
		}).then((res) => {
			if (res.code === 200) {
				memorizedHandleHistoryChange(res.data);
			}
		});
	}, []);

	return (
		<div className='bg-[rgba(0,0,0,.6)] overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
			<div className={'w-[640px] bg-white rounded-[10px]'}>
				<div className={'flex justify-between text-slate-900 px-[20px] py-[14px] border-b-[1px]'}>
					<p>查看操作历史：</p>
				</div>
				<div className={'py-[20px] px-[20px] flex gap-2'}>
					<p>选择时间区间：</p>
					<ReactDatePicker
						className={'text-[14px] w-[240px] border-slate-900 border-[1px] rounded-[4px]'}
						dateFormat='yyyy/MM/dd'
						selectsRange={true}
						startDate={startDate}
						endDate={endDate}
						onChange={(update) => {
							setDateRange(update);
							if (update[0] && update[1] && id) {
								CheckOperationHistory({
									user_id: id,
									start_date: dayjs(+update[0]).format('YYYY-MM-DD'),
									end_date: dayjs(+update[1]).format('YYYY-MM-DD'),
								}).then((res) => {
									if (res.code === 200) {
										memorizedHandleHistoryChange(res.data);
									}
								});
							}
							if (!update[0] && !update[1] && id) {
								CheckOperationHistory({
									user_id: id,
								}).then((res) => {
									if (res.code === 200) {
										memorizedHandleHistoryChange(res.data);
									}
								});
							}
						}}
						isClearable={true}
					/>
				</div>
				<div>
					<div>
						<div className='flex flex-col'>
							<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
								<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
									<div className='overflow-hidden'>
										<table className='min-w-full text-left text-sm font-light text-surface dark:text-white'>
											<thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
												<tr>
													<th scope='col' className='px-6 py-4'>
														操作时间
													</th>
													<th scope='col' className='px-6 py-4'>
														增加前
													</th>
													<th scope='col' className='px-6 py-4'>
														增加后
													</th>
													<th scope='col' className='px-6 py-4'>
														增加小时
													</th>
												</tr>
											</thead>
											<tbody>
												{history.map((item) => {
													return (
														<tr
															key={item.id}
															className='border-b border-neutral-200 dark:border-white/10'
														>
															<td className='whitespace-nowrap px-6 py-4'>{item.created_at}</td>
															<td className='whitespace-nowrap px-6 py-4'>
																{dayjs(+item.before_date * 1000).format('YYYY-MM-DD hh:mm:ss')}
															</td>
															<td className='whitespace-nowrap px-6 py-4'>
																{dayjs(+item.later_date * 1000).format('YYYY-MM-DD hh:mm:ss')}
															</td>
															<td className='whitespace-nowrap px-6 py-4'>{item.hour}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={'flex justify-end pb-[16px] px-[20px] gap-[20px]'}>
					<button
						onClick={() => props.onClose()}
						className='flex w-[100px] bg-gray-50 text-slate-900 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						关闭
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckHistoryModal;
