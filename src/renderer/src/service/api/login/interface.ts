export interface LoginParams {
	username: string; // 6-20
	password: string; // 6-18 不包含特殊字符
}

export interface CreateUserApiRes {
	content: {
		code: number;
	};
}
