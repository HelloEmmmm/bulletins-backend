import { post } from '../../fetch';
import { LoginParams } from './interface';

export const LoginApi = (data: LoginParams) => {
	return post(`/adminLogin`, data);
};
