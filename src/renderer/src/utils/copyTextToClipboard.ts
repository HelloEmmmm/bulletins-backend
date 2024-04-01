import { toast } from 'react-toastify';

export const copyTextToClipboard = (text: string): void => {
	navigator.clipboard.writeText(text).then(
		() => {
			toast.success('已成功复制到剪贴板');
		},
		(err) => {
			toast.error('无法复制', err);
		}
	);
};
