export interface ConfigInfo {
	phone: string;
	wechat: string;
	qq: string;
	remarks?: string;
}

export interface GetNoticesListBody {
	startDate?: string;
	endDate?: string;
	is_trial?: 1 | 2 | 3;
}

export interface NoticeItem {
	id: number;
	message: string;
	created_at: string;
	type: 1 | 2; // 1 启用  2 禁用
	is_trial: 1 | 2 | 3; // 1 试用  2 正式  3 全部
}

export interface UpdateNoticesTypeBody {
	id: number;
	type: 1 | 2;
}

export interface AddNoticesTypeBody {
	group: 1 | 2 | 3; // 1 试用  2 正式  3 全部
	message: string;
}

export interface GetNoticesListRes {
	code: number;
	data: NoticeItem[];
}
