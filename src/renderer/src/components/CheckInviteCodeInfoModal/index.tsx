import { GetAllInviteCodesRes } from '../../service/api/invite/interface';

export interface CheckInviteCodeInfoModalProps {
	onClose: () => void;
	info: GetAllInviteCodesRes['data'][number]['user'];
}

const CheckInviteCodeInfoModal = (props: CheckInviteCodeInfoModalProps) => {
	return (
		<div className='bg-[rgba(0,0,0,.6)] overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
			<div className={'w-[440px] bg-white rounded-[10px]'}>
				<div className={'flex justify-between text-slate-900 px-[20px] py-[14px] border-b-[1px]'}>
					<p>使用信息：</p>
				</div>
				<div className={'flex flex-col gap-4 py-[20px] px-[20px]'}>
					<div className={'flex'}>
						<p className={'w-[120px]'}>用户ID: </p>
						<p>{props?.info?.id}</p>
					</div>
					<div className={'flex'}>
						<p className={'w-[120px]'}>用户名称: </p>
						<p>{props?.info?.username}</p>
					</div>
				</div>
				<div className={'flex justify-end pb-[16px] px-[20px] gap-[20px]'}>
					<button
						onClick={props.onClose}
						className='flex w-[100px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						确认
					</button>
				</div>
			</div>
		</div>
	);
};

export default CheckInviteCodeInfoModal;
