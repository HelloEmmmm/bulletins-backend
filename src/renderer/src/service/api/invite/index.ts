import { get, post } from '../../fetch';
import { GenerateInviteCodeParams, GetAllInviteCodesRes } from './interface';

export const GetAllInviteCodes = (): Promise<GetAllInviteCodesRes> => {
	return get(`/getAllInviteCodes`);
};

export const GenerateInviteCode = (data: GenerateInviteCodeParams) => {
	return post(`/generate`, data);
};
