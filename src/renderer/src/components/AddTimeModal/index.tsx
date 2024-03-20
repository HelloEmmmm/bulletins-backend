import { useState } from 'react';
import { AddTime } from '../../service/api/users';

export interface ModalProps {
	onClose: () => void;
	userId: number | undefined;
	onOk: (msg: string) => void;
}

const AddTimeModal = (props: ModalProps) => {
	const [hours, setHours] = useState<undefined | number>(undefined);

	return (
		<div className='bg-[rgba(0,0,0,.6)] overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
			<div className={'w-[440px] bg-white rounded-[10px]'}>
				<div className={'flex justify-between text-slate-900 px-[20px] py-[14px] border-b-[1px]'}>
					<p>增加试用时长：</p>
				</div>
				<div className={'py-[20px] px-[20px]'}>
					<textarea
						style={{ resize: 'none' }}
						value={hours}
						onChange={(e) => {
							const value = e.target.value;
							const reg = new RegExp('^[0-9]*$');
							if (reg.test(value)) {
								setHours(Number(value));
							}
						}}
						rows={1}
						className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='输入数字，小时为单位'
					/>
				</div>
				<div className={'flex justify-end pb-[16px] px-[20px] gap-[20px]'}>
					<button
						onClick={() => props.onClose()}
						className='flex w-[100px] bg-gray-50 text-slate-900 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						取消
					</button>
					<button
						onClick={() => {
							if (!hours || !props.userId) return;
							AddTime({ user_id: props.userId, hour: hours }).then((res) => {
								if (res.code === 200) {
									props.onOk(res.msg);
								}
							});
						}}
						className='flex w-[100px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						确认
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddTimeModal;
