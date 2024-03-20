import { get, post } from '../../fetch';

export interface User {
	client_id: string;
	client_type: number;
	created_at: string;
	date_type: 1 | 2;
	expiration_date: number;
	id: number;
	invitation_code: string;
	is_trial: 1 | 2;
	last_login_at: null | string;
	password: string;
	phone_number: string;
	status: 1 | 2 | 3;
	type: 1 | 2;
	username: string;
}

export const GetUsers = (): Promise<{ code: number; data: Array<User> }> => {
	return get(`/getUserList`);
};

export interface UpdateTrialReq {
	user_id: number;
	is_trial: 1 | 2;
}

export const UpdateTrial = (data: UpdateTrialReq): Promise<{ code: number; data: Array<User> }> => {
	return post(`/updateUserType`, data);
};

export interface SendMessageReq {
	group?: 1 | 2;
	code: string;
}

export const SendMessage = (data: SendMessageReq): Promise<{ code: number; msg: string }> => {
	return post(`/insertData`, data);
};

export interface AddTimeReq {
	user_id: number;
	hour: number;
}

export const AddTime = (data: AddTimeReq): Promise<{ code: number; msg: string }> => {
	return post(`/addUserExpiration`, data);
};
