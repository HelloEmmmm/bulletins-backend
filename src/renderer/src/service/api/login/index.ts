import { post } from '../../fetch';

export interface LoginParams {
	username: string;
	password: string;
}

export const LoginApi = (data: LoginParams) => {
	return post(`/adminLogin`, data);
};
