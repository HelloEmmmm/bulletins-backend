import { post } from '../../fetch';
import { CreateUserApiParams } from './interface';

export const LoginApi = (data: CreateUserApiParams) => {
	return post(`/adminLogin`, data);
};
