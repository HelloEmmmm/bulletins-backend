export interface GenerateInviteCodeParams {
	is_trial: 1 | 2;
}

export interface GetAllInviteCodesRes {
	code: number;
	data: {
		code: string;
		is_trial: 1 | 2; // 1试用 2正式
		is_used: 1 | 2; // 1未使用 2使用
		user: {
			id: number;
			username: string;
		} | null;
	}[];
}
