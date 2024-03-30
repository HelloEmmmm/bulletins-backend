import { post } from '../../fetch';

export interface LoginParams {
	username: string; // 6-20
	password: string; // 6-18 不包含特殊字符
}

export const LoginApi = (data: LoginParams) => {
	return post(`/adminLogin`, data);
};
