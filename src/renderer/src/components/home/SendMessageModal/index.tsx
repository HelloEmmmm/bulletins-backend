import { useState } from 'react';
import { SendMessage } from '../../../service/api/users';

export interface ModalProps {
	onClose: () => void;
	onOk?: (message?: string) => void;
}

const radioName = 'default-radio';

const SendMessageModal = (props: ModalProps) => {
	const [message, setMessage] = useState<string>('');
	const [messageType, setMessageType] = useState<0 | 1 | 2>(0);

	const handleRadioChange = () => {
		const arr = document.getElementsByName(radioName) as unknown as HTMLInputElement[];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].checked === true) {
				setMessageType(i as 0 | 1 | 2);
			}
		}
	};

	return (
		<div className='bg-[rgba(0,0,0,.6)] overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
			<div className={'w-[440px] bg-white rounded-[10px]'}>
				<div className={'flex justify-between text-slate-900 px-[20px] py-[14px] border-b-[1px]'}>
					<p>群发消息：</p>
					<div className={'flex gap-2'}>
						<div className='flex items-center'>
							<input
								id={'default-radio-0'}
								onChange={handleRadioChange}
								type='radio'
								name={radioName}
								value={0}
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							/>
							<label
								htmlFor='default-radio-0'
								className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
							>
								全体
							</label>
						</div>
						<div className='flex items-center'>
							<input
								id={'default-radio-1'}
								onChange={handleRadioChange}
								type='radio'
								name={radioName}
								value={1}
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							/>
							<label
								htmlFor='default-radio-1'
								className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
							>
								试用用户
							</label>
						</div>
						<div className='flex items-center'>
							<input
								id={'default-radio-2'}
								onChange={handleRadioChange}
								value={2}
								type='radio'
								name={radioName}
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							/>
							<label
								htmlFor='default-radio-2'
								className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
							>
								正式用户
							</label>
						</div>
					</div>
				</div>
				<div className={'py-[20px] px-[20px]'}>
					<textarea
						style={{ resize: 'none' }}
						value={message}
						onChange={(e) => {
							const str = e.target.value;
							setMessage(str);
						}}
						rows={4}
						className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Write your thoughts here...'
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
							SendMessage({
								group: messageType ? messageType : undefined,
								code: message,
							}).then((res) => {
								if (res.code === 200) {
									props.onOk?.(res.msg);
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

export default SendMessageModal;
