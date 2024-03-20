import { get, post } from '../../fetch';
import { GenerateInviteCodeParams, GenerateInviteCodeRes, GetAllInviteCodesRes } from './interface';

export const GetAllInviteCodes = (): Promise<GetAllInviteCodesRes> => {
	return get(`/getAllInviteCodes`);
};

export const GenerateInviteCode = (
	data: GenerateInviteCodeParams
): Promise<GenerateInviteCodeRes> => {
	return post(`/generate`, data);
};
